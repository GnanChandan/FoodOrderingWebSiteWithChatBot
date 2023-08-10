export default function Location()
{
    return (
        <section id="location">
        <div className="py-16 bg-gray-100">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <p className="text-gray-700">
              Visit us at our main location:
              <br />
              <span className="block text-lg">
                123 Food Street, Cityville, Country
              </span>
              Postal Code: 12345
            </p>
            <div className="mt-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    )
}