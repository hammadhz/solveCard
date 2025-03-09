import React, { useState, useEffect } from "react";
import {FiUpload} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {setProfileData, setQrColor, setQrPhoto, setThemeColor as updateThemeColor} from "../../context/slice/profileSlice";
import {Button} from "../form";
import imageCompression from "browser-image-compression";
import {base64ToBlob} from "../../utils/base64ToBlob";

const MAX_FILE_SIZE = 6 * 1024 * 1024;

const QrCodeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { profileData } = useSelector((state) => state.profile);
    const userData = useSelector((state) => state?.auth?.user);

    const [qrColors, setQrColors] = useState([]);

    const [selectedQrColor, setSelectedQrColor] = useState(null);
    const [qrLogo, setQrLogo] = useState(null);
    const [qrLogoPreview, setQrLogoPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(true);
    const [qrLoading, setQrLoading] = useState(false);

    useEffect(() => {
        const fetchQrColors = async () => {
            setQrLoading(true);
            try {
                const response = await axiosInstance.get("/buttonColors");
                setQrColors(response.data.buttonColors);
            } catch (error) {
                console.error("Error fetching button colors:", error);
            }
            setQrLoading(false);
        }

        if (profileData) {
            setSelectedQrColor(profileData.qr_color || null);
            if (profileData.qr_logo) {
                setQrLogo(profileData.qr_logo);
            }
            dispatch(setQrColor(profileData.qr_color ?? "#2A9562"))
            dispatch(setQrPhoto(profileData.qr_logo ?? null))
        }

        console.log(userData)
        fetchQrColors();
        setUpdate(false);
    }, [update]);

    const handleQrColor = (color) => {
        setSelectedQrColor(color);
        dispatch(setQrColor(color))
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file || file.size > MAX_FILE_SIZE) {
            toast.error(`logo size must be less than 6MB.`);
            return;
        }

        try {
            const compressedFile = await imageCompression(file, { maxSizeMB: 4, useWebWorker: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrLogo(base64ToBlob(reader.result));
                setQrLogoPreview(reader.result);
                dispatch(setQrPhoto(reader.result))
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error(`Error compressing qr logo:`, error);
        }
    };

    const handleRemoveLogo = () => {
        setQrLogo(null);
        setQrLogoPreview(null);
        dispatch(setQrPhoto(null))
    };

    const resetQr = () => {
        setSelectedQrColor(profileData.qr_color || null);
        if (profileData.qr_logo) {
            setQrLogo(profileData.qr_logo);
            setQrLogoPreview(null);
            dispatch(setQrPhoto(profileData.qr_logo ?? null))
        }
        dispatch(setQrColor(profileData.qr_color ?? "#2A9562"))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData?.is_pro && !userData?.is_subscribed) {
            toast.error('Upgrade to Pro to create a customize QR Code')
            return;
        }

        setLoading(true);

        try {
            const body = {
                profile_id: id,
                qr_color: selectedQrColor,
                qr_logo: qrLogo
            }

            console.log(body, 'body');
            const response = await axiosInstance.post("/updateProfile", body);

            if (response.status === 200) {
                toast.success("QR Code updated successfully");

                // Update profile data in redux
                dispatch(setProfileData({
                    ...profileData,
                    qr_color: selectedQrColor,
                    qr_logo: qrLogo
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating QR code");
            console.error("Error updating QR code:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-full flex justify-center grow bg-white border-r-2 border-r-white overflow-y-auto">
            <div className="flex flex-col w-full p-8 bg-white rounded-lg">
                {/* Header */}
                <header className="text-start w-full z-40 flex justify-between items-center mb-8">
                    <h1 className="font-inter font-bold text-2xl">Qr Code</h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* QR Color Selection */}
                    <div className="w-full bg-primary rounded-lg p-3">
                        <div className="w-full rounded-lg flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 items-center justify-between bg-white border border-primary p-3">
                        <label
                            htmlFor=""
                            className="block text-sm font-inter font-medium text-gray-900"
                        >
                            Choose QR Code Theme
                        </label>
                        <div className="flex items-center justify-end flex-grow gap-2">
                            {qrColors?.map((color) => (
                                <div
                                    key={color.id}
                                    className={`rounded-full w-6 h-6 cursor-pointer border ${selectedQrColor === color.color_code ? 'ring-2 ring-black ring-offset-2' : ''}`}
                                    style={{ backgroundColor: color.color_code }}
                                    onClick={() => handleQrColor(color.color_code)}
                                ></div>
                            ))}
                            {qrLoading && (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    </div>

                    {/* QR Logo Upload */}
                    <div className="w-full bg-primary rounded-lg p-3">
                        <div className="bg-white p-3 rounded-lg">
                            <label
                                htmlFor="qr-logo"
                                className="block text-sm font-inter font-medium text-gray-900 mb-2"
                            >
                                Custom logo
                            </label>

                            <div className="flex flex-col items-center space-y-4">
                                {qrLogo && !qrLogoPreview ? (
                                    <div className="relative">
                                        <img
                                            src={`${process.env.REACT_APP_SERVER}${qrLogo}`}
                                            alt="QR Logo Preview"
                                            className="h-24 w-24 object-contain border border-gray-200 rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : qrLogoPreview ? (
                                    <div className="relative">
                                        <img
                                            src={qrLogoPreview}
                                            alt="QR Logo Preview"
                                            className="h-24 w-24 object-contain border border-gray-200 rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="qr-logo-input"
                                            className="flex flex-col items-center justify-center w-1/2 mx-auto h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FiUpload className="w-8 h-8 text-gray-500 mb-2" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span>
                                                </p>
                                            </div>
                                            <input
                                                id="qr-logo-input"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                    </div>
                                )}

                                <p className="text-sm text-gray-500 italic">
                                    Add custom logo to be displayed in the middle of the QR Code
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 pb-2">
                        <Button
                            type="submit"
                            intent={"primary"}
                            children={"Save QR Code"}
                            size={"sm"}
                            loading={loading}
                            roundness={"round"}
                            classes={"!bg-black !text-white"}
                        />
                        <Button
                            type="button"
                            intent={"secondary"}
                            children={"Reset"}
                            size={"lg"}
                            classes={"gap-2 !py-2 !px-5"}
                            eventAction={resetQr}
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default QrCodeEdit;
