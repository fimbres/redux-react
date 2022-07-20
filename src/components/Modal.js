import React from 'react';

export default function Modal({ showModal, children }) {
    return (
        <>
            <div className={`fixed inset-0 backdrop-blur-md backdrop-brightness-50 transition duration-500 ease-in-out delay-200 ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{zIndex:16}}/>
            <div className={`fixed inset-x-0 top-1/2 transition duration-500 ease-in-out delay-100 ${showModal ? "-translate-y-1/2 opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{zIndex:17}}>
                {children}
            </div>
        </>
    )
}
