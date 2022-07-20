import React from 'react';

export default function Modal({ showModal, children }) {
    return (
        showModal && <>
            <div className={`fixed inset-0 backdrop-blur-md backdrop-brightness-50 transition duration-500 ease-in-out delay-200 ${showModal ? "opacity-100" : "opacity-0"}`} style={{zIndex:16}}/>
            <div className={`fixed inset-x-0 top-0 transition duration-500 ease-in-out delay-100 ${showModal ? "translate-y-10 opacity-100" : "opacity-0"}`} style={{zIndex:17}}>
                {children}
            </div>
        </>
    )
}
