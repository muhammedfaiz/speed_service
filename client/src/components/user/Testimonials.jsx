const Testimonials = () => {
    const testimonials = [
      {
        name: "Alice Johnson",
        feedback: "Speed Service made my life so much easier! Highly recommended.",
        imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      {
        name: "Mark Thompson",
        feedback: "Very professional and on time. Great experience overall.",
        imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        name: "Bob Brown",
        feedback: "Friendly and attentive staff. Highly recommend!",
        imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      }
    ];
  
    return (
      <div className="bg-white py-12">
        <h3 className="text-3xl font-bold px-12 py-4 text-gray-800">What Our Clients Say</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg text-center"
            >
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">
                {testimonial.name}
              </p>
              <p className="mt-2 text-gray-600">{`"${testimonial.feedback}"`}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Testimonials;  