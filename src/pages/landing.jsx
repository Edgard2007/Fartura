import Layout from "../components/Layout";
import Icon from "../components/Icon";

export default function Landing() {
  return (
    <Layout>
    <div className="font-sans text-gray-800 bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-cover bg-center text-white min-h-[600px] flex flex-col justify-between p-8 md:p-16" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef')" }}>
        <header className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <div className="text-sm tracking-widest uppercase font-semibold">Agricultural</div>
          <div className="text-xl font-bold tracking-tight">CULTIVATING FUTURE</div>
        </header>

        <div className="max-w-2xl my-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4">
            Cultivating the Future, <br/>
            <span className="italic">Honoring Our Roots</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base mb-8 max-w-lg">
            Sustainable farming methods, fresh local crops, and community empowerment driven by traditional wisdom and modern technology.
          </p>
          <div className="flex gap-4">
            <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded text-sm font-medium transition">
              Explore Our Produce
            </button>
            <button className="border border-white hover:bg-white/10 text-white px-6 py-3 rounded text-sm font-medium transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT / CONNECTION SECTION */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-amber-600 text-xs font-semibold uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6 leading-tight">
            A direct connection from the family field <span className="italic text-amber-700">to your kitchen table</span>
          </h2>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            We work directly with local farmers to ensure every harvest reaches you at peak fresh flavor and nutrient density, completely free from harmful synthetic chemicals.
          </p>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            By prioritizing crop diversity and soil restoration, we build resilient agricultural networks that feed communities while caring for the earth.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">✓ 100% Organic & Non-GMO</li>
            <li className="flex items-center gap-2">✓ Regenerative Soil Practices</li>
            <li className="flex items-center gap-2">✓ Direct Fair Trade Support</li>
          </ul>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc" alt="Farmers working" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
          <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-6 rounded-lg shadow-xl max-w-xs">
            <div className="text-3xl font-bold">04</div>
            <div className="text-xs font-medium uppercase tracking-wider">Generations of Farming Heritage</div>
          </div>
        </div>
      </section>

      {/* CROPS / PRODUCE SECTION */}
      <section className="py-20 bg-stone-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-amber-600 text-xs font-semibold uppercase tracking-wider">Our Products</span>
              <h2 className="text-3xl font-serif mt-2">Diverse crops grown with care and ecological respect</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md mt-4 md:mt-0">
              Each season brings a tailored variety of fresh produce, carefully cultivated to preserve native flavors and soil vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fresh Vegetables', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999', tags: ['Seasonal', 'Local', 'Organic'] },
              { title: 'Orchard Fruits', img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b', tags: ['Hand-picked', 'Raw', 'Fresh'] },
              { title: 'Native Grains', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b', tags: ['Heirloom', 'Whole', 'Sustainable'] },
            ].map((crop, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={crop.img} alt={crop.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{crop.title}</h3>
                  <p className="text-gray-500 text-xs mb-4">Grown using regenerative water and soil management practices.</p>
                  <div className="flex gap-2">
                    {crop.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-stone-100 text-stone-600 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="relative py-24 bg-cover bg-center text-white text-center px-8" style={{ backgroundImage: "linear-gradient(rgba(20,40,25,0.85), rgba(20,40,25,0.85)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef')" }}>
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-4">Restoring harmony between soil, seasons, and society</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">We measure success not just by yield, but by ecological health and community vitality.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '80%', label: 'Water Conserved', desc: 'Through drip irrigation systems' },
            { value: '3.4k', label: 'Acres Protected', desc: 'Dedicated to wild biodiversity' },
            { value: '0%', label: 'Synthetic Chemicals', desc: 'Used across all partner farms' },
            { value: '14+', label: 'Local Farm Partners', desc: 'In our regional network' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-left border border-white/10">
              <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-gray-300">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-amber-600 text-xs font-semibold uppercase tracking-wider">Life on the Land</span>
          <h2 className="text-3xl font-serif mt-2">Capturing the daily rhythm of life on the land</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5" className="col-span-1 md:col-span-2 h-72 w-full object-cover rounded-lg" alt="Soil hands" />
          <img src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0" className="h-72 w-full object-cover rounded-lg" alt="Plant leaf close-up" />
          <img src="https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc" className="h-72 w-full object-cover rounded-lg" alt="Fresh harvest" />
          <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b" className="col-span-1 md:col-span-2 h-72 w-full object-cover rounded-lg" alt="Farmers gathering" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 bg-stone-100 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-lg md:text-xl font-serif italic text-gray-700 mb-6">
            "Organics helped us return to our farming roots and has given our soil new life. Their expertise, network of support, and commitment to the family farm model made a total difference."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="Farmer" className="w-10 h-10 rounded-full object-cover" />
            <div className="text-left">
              <div className="text-sm font-bold">Arthur Lee</div>
              <div className="text-xs text-gray-500">Partner Farmer, Valley View</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER SECTION */}
      <footer className="bg-emerald-950 text-white pt-20 pb-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 pb-16 border-b border-emerald-900">
          <div>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl font-serif mt-2 mb-6">
              Partner with our <span className="italic text-amber-500">agricultural mission</span>
            </h2>
            <p className="text-emerald-200/70 text-sm max-w-sm mb-6">
              Whether you are a local grower, a distributor, or a conscious consumer, we'd love to connect with you.
            </p>
            <p className="text-xs text-emerald-200/50">info@agricultural-mission.com | +1 (555) 234-5678</p>
          </div>

          <div className="bg-emerald-900/40 p-8 rounded-lg border border-emerald-800/50">
            <h3 className="text-lg font-medium mb-4">Send us a message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-emerald-950/60 border border-emerald-800 rounded px-4 py-2.5 text-sm text-white placeholder-emerald-600 focus:outline-none focus:border-amber-500" />
              <input type="email" placeholder="Your Email" className="w-full bg-emerald-950/60 border border-emerald-800 rounded px-4 py-2.5 text-sm text-white placeholder-emerald-600 focus:outline-none focus:border-amber-500" />
              <textarea rows="3" placeholder="How can we collaborate?" className="w-full bg-emerald-950/60 border border-emerald-800 rounded px-4 py-2.5 text-sm text-white placeholder-emerald-600 focus:outline-none focus:border-amber-500"></textarea>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded text-sm transition">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-200/40">
          <div>© 2026 Agricultural Mission. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
    </Layout>
  );
};