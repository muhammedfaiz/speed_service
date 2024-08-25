const HowItWorks = () => {
    const steps = [
      {
        title: "Book a Service",
        description: "Select a service and choose your preferred time.",
        icon: "📅",
      },
      {
        title: "Get Matched",
        description: "We match you with a trusted professional.",
        icon: "🤝",
      },
      {
        title: "Service at Your Doorstep",
        description: "Our professional arrives at your location.",
        icon: "🚪",
      },
      {
        title: "Review & Pay",
        description: "Review the service and make the payment securely.",
        icon: "💳",
      },
    ];
  
    return (
      <div className="bg-white py-12">
        <h3 className="text-3xl font-bold px-12 py-4 text-gray-800">How It Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl">{step.icon}</div>
              <h4 className="text-xl font-semibold mt-4">{step.title}</h4>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default HowItWorks;