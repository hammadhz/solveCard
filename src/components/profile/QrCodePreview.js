import {Link, useParams} from "react-router-dom";
import {CiShare1} from "react-icons/ci";
import ProfileViewCard from "./ProfileViewCard";
import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import QRCode from "react-qr-code";
import logo from "../../assets/svgs/logo.svg";


const QrCodePreview = () => {
    const { id } = useParams();
    const { profileData } = useSelector((state) => state.profile);
    const qrColor = useSelector((state) => state.profile.qrColor);
    const qrLogo = useSelector((state) => state.profile.qrPhoto);

    console.log(qrLogo, qrColor);

    return (
        <section
            className="w-full lg:w-3/12 lg:col-span-2 justify-center overflow-y-auto"
        >
            <div className="w-full flex-col gap-4 py-4 h-full">
                <div className="flex flex-col gap-4 text-center mb-2">
                    <div className="text-start w-full">
                        <h1 className="font-inter font-bold text-xl">
                            {profileData?.name} QR Code
                        </h1>
                    </div>
                </div>
                {/* QR Code Display */}
                <div className="flex items-center justify-center my-6">
                    <div className="relative bg-white p-4 rounded-lg shadow-md inline-block">
                        <QRCode
                            value={profileData?.card_uuid}
                            size={250}
                            fgColor={qrColor}
                            level="H"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            {qrLogo ? (
                                <>
                                    {qrLogo.startsWith("data:image/") ? (
                                        <img
                                            src={qrLogo}
                                            className="h-11 w-11 object-contain bg-white rounded-md"
                                            alt="QR logo"
                                        />
                                    ) : qrLogo.startsWith("uploads/") ? (
                                        <img
                                            src={`${process.env.REACT_APP_SERVER}${qrLogo}`}
                                            className="h-11 w-11 object-contain bg-white rounded-md"
                                            alt="QR logo"
                                        />
                                    ) : (
                                        <img
                                            src={logo}
                                            className="h-11 w-11 object-contain bg-white rounded-md"
                                            alt="QR logo"
                                        />
                                    )}
                                </>
                            ) : (
                                <img
                                    src={logo}
                                    className="h-11 w-11 object-contain bg-white rounded-md"
                                    alt="QR logo"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QrCodePreview;