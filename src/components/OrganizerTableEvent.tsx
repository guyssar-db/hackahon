import React from 'react';

export default function OrganizerTableEvent() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">
                                Product Name
                            </th>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">
                                Unit Price
                            </th>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">
                                Qty
                            </th>
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-6 py-4 flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Product"
                                    className="w-12 h-12 rounded-md"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        Apple Watch Series 8 GPS 45mm
                                    </p>
                                    <span className="text-green-500 text-sm">
                                        UBL
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">$550</td>
                            <td className="px-6 py-4">x3</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                $1,500
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-4 flex items-center gap-4">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww"
                                    alt="Product"
                                    className="w-12 h-12 rounded-md"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        Apple Watch Series 8 GPS 45mm
                                    </p>
                                    <span className="text-green-500 text-sm">
                                        UBL
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">$550</td>
                            <td className="px-6 py-4">x3</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                $1,500
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 flex items-center gap-4">
                                <img
                                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
                                    alt="Product"
                                    className="w-12 h-12 rounded-md"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        Apple Watch Series 8 GPS 45mm
                                    </p>
                                    <span className="text-green-500 text-sm">
                                        UBL
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">$550</td>
                            <td className="px-6 py-4">x3</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                $1,500
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
