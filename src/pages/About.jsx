import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">
        हाम्रो वेबसाइट बारे
      </h1>

      {/* Intro */}
      <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-10">
        यो वेबसाइट एक अनलाइन मार्केटप्लेस हो जहाँ तपाईंले आफ्नो सामान सजिलै 
        बेच्न र किन्न सक्नुहुन्छ। यहाँ मोबाइल, इलेक्ट्रोनिक्स, गाडी, 
        फर्निचर लगायत विभिन्न सामानहरू उपलब्ध छन्।
      </p>

      {/* How it works */}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        वेबसाइट कसरी प्रयोग गर्ने ?
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Step 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-xl font-semibold mb-2">
            १. अकाउन्ट बनाउनुहोस्
          </h3>
          <p className="text-gray-600">
            सबैभन्दा पहिले वेबसाइटमा आफ्नो अकाउन्ट बनाउनुहोस् र लगइन गर्नुहोस्।
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-xl font-semibold mb-2">
            २. सामान पोस्ट गर्नुहोस्
          </h3>
          <p className="text-gray-600">
            बेच्न चाहेको सामानको फोटो, विवरण र मूल्य राखेर पोस्ट गर्नुहोस्।
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="text-xl font-semibold mb-2">
            ३. किनबेच गर्नुहोस्
          </h3>
          <p className="text-gray-600">
            अन्य प्रयोगकर्ताले तपाईंको सामान हेरेर सिधै सम्पर्क गरी किनबेच गर्न सक्छन्।
          </p>
        </div>

      </div>

      {/* Features */}
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-center">
        हाम्रो वेबसाइटका विशेषताहरू
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-blue-50 p-5 rounded-lg">
          ✅ सजिलो सामान पोस्ट गर्न मिल्ने
        </div>

        <div className="bg-blue-50 p-5 rounded-lg">
          ✅ विभिन्न क्याटेगोरीमा सामान खोज्न मिल्ने
        </div>

        <div className="bg-blue-50 p-5 rounded-lg">
          ✅ सुरक्षित प्रयोगकर्ता प्रणाली
        </div>

        <div className="bg-blue-50 p-5 rounded-lg">
          ✅ छिटो र सजिलो किनबेच प्रक्रिया
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          अहिले नै सामान हेर्नुहोस्
        </Link>
      </div>

    </div>
  );
}