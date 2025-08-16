export default function Contact() {
  return (
    <section className="bg-[#F7F8FA] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">Contact Us</h1>
        <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#56B280]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#56B280]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#56B280]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#56B280] text-white px-6 py-2 rounded-sm font-medium hover:bg-[#4da372] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
