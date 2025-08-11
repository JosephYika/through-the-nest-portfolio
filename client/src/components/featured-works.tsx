export default function FeaturedWorks() {
  const featuredWorks = [
    {
      id: 1,
      image: "/images/CultureMain_1754647610299.JPG",
      title: "Cultural Heritage",
      description: "Celebrating traditions through intimate portraiture",
      category: "culture"
    },
    {
      id: 2,
      image: "/images/OldMoneyMain_1754647610299.JPG",
      title: "Lifestyle Elegance",
      description: "Urban photography with timeless appeal",
      category: "lifestyle"
    },
    {
      id: 3,
      image: "/images/RomanticMain_1754647610300.jpg",
      title: "Romantic Moments",
      description: "Capturing love stories with artistic vision",
      category: "romantic"
    }
  ];

  return (
    <section className="py-20 bg-ivory dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-copernicus text-4xl md:text-5xl font-bold mb-6">Featured Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated selection of our most compelling photography, spanning diverse styles and meaningful moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorks.map((work) => (
            <div key={work.id} className="featured-work group cursor-pointer fade-in hover:scale-[1.02] transition-all duration-300" data-category={work.category}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-copernicus text-2xl font-bold mb-2">{work.title}</h3>
                    <p className="text-sm">{work.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
