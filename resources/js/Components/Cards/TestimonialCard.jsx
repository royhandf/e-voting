export default function TestimonialCard({ image, name, testimonial }) {
    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 rounded-lg h-[250px] flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {name}
                    </h3>
                </div>
            </div>
            <p className="text-gray-600 flex-grow text-left">{testimonial}</p>
        </div>
    );
}
