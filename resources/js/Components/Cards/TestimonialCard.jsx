import React from "react";

const TestimonialCard = ({ image, name, testimonial }) => {
    return (
        <figure className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col flex-1 min-h-[300px]">
            <figcaption className="flex items-center space-x-4 mb-4">
                <img
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="text-left">
                    <div className="text-gray-900 font-semibold text-lg">
                        {name}
                    </div>
                </div>
            </figcaption>

            <blockquote className="flex-grow">
                <p className="text-lg text-gray-700 leading-relaxed italic">
                    &ldquo;{testimonial}&rdquo;
                </p>
            </blockquote>
        </figure>
    );
};

export default TestimonialCard;
