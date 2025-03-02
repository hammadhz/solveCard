import React from "react";
import QRCode from "react-qr-code";
import {Button} from "../form";

const QRCodeModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
                <div className={"flex items-end mb-4"}>
                    <div className={`flex items-end border-r-2 pr-4`}>
                        <p className="font-inter font-bold text-3xl">
                            Solve
                        </p>
                        <span className="font-inter font-medium text-xl">
                          Card
                        </span>
                    </div>
                    <h6 className="ps-4 text-xl font-lg">Download the app</h6>
                </div>
                <p className="mb-4">The SolveCard app is needed to share your digital business card.</p>
                <div className="flex justify-center mb-4">
                    <QRCode value="https://example.com/download-app" />
                </div>
                <p className="text-center">Scan this QR code to get the app on</p>
                <p className="text-center">iPhone or Android</p>
                <div className={"flex justify-end mt-4"}>
                    <Button
                        type={"button"}
                        intent={"secondary"}
                        size={"md"}
                        children={"Close"}
                        classes={""}
                        eventAction={onClose}
                    />
                </div>

            </div>
        </div>
    );
};

export default QRCodeModal;