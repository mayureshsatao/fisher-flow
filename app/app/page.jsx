"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Download,
  TrendingUp,
  Package,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  Star,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } from "next/dist/next-devtools/userspace/app/segment-explorer-node";

const CompleteBioLabAgent = () => {
  const [experiment, setExperiment] = useState("");
  const [protocols, setProtocols] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comparisonView, setComparisonView] = useState("cost");
  const [cart, setCart] = useState([]);
  const [showProtocolDetails, setShowProtocolDetails] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [supplierAnalysis, setSupplierAnalysis] = useState(null);
  const [items, setItems] = useState([]);
  const [cartNotification, setCartNotification] = useState(null);

  // Mock AI API call (in real implementation, this calls Claude API)
  const analyzeExperimentWithAI = async (experimentText) => {
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const keywords = experimentText.toLowerCase();

    if (
      keywords.includes("pcr") ||
      keywords.includes("amplification") ||
      keywords.includes("dna")
    ) {
      return generatePCRProtocols(experimentText);
    } else if (
      keywords.includes("cell culture") ||
      keywords.includes("culture") ||
      keywords.includes("mammalian")
    ) {
      return generateCellCultureProtocols(experimentText);
    } else if (
      keywords.includes("western") ||
      keywords.includes("protein") ||
      keywords.includes("blot")
    ) {
      return generateProteinProtocols(experimentText);
    } else {
      return generateDefaultProtocols(experimentText);
    }
  };

  const generatePCRProtocols = (experimentText) => {
    const needsHighFidelity =
      experimentText.toLowerCase().includes("cloning") ||
      experimentText.toLowerCase().includes("high fidelity") ||
      experimentText.toLowerCase().includes("sequencing");

    return [
      {
        id: "standard-pcr",
        name: "Standard PCR Protocol",
        difficulty: "Easy",
        duration: "3-4 hours",
        successRate: 95,
        costCategory: "Budget-friendly",
        description:
          "Traditional PCR amplification using Taq polymerase - reliable and cost-effective",
        priority: needsHighFidelity ? "medium" : "high",
        advantages: [
          "Most cost-effective ($2.45/reaction)",
          "Well-established protocol",
          "Widely available reagents",
          "Simple setup",
        ],
        disadvantages: [
          "Lower fidelity (1 error per 1000 bp)",
          "Limited amplicon size (<5 kb)",
          "No proofreading",
        ],
        totalEstimatedCost: 245.5,
        costPerReaction: 2.45,
        reagents: [
          {
            name: "Taq DNA Polymerase (500 units)",
            category: "Enzyme",
            criticality: 10,
            function: "DNA synthesis enzyme",
            suppliers: {
              ThermoFisher: {
                price: 89.99,
                bulkPrice: 76.49,
                minBulk: 5,
                quality: "High",
                reliability: 9.2,
                catalogNumber: "EP0402",
                leadTime: "2-3 days",
                qualityScore: 8.5,
              },
              NEB: {
                price: 95.0,
                bulkPrice: 85.5,
                minBulk: 3,
                quality: "Premium",
                reliability: 9.4,
                catalogNumber: "M0267S",
                leadTime: "1-2 days",
                qualityScore: 9.1,
              },
              "Bio-Rad": {
                price: 87.25,
                bulkPrice: 78.53,
                minBulk: 4,
                quality: "High",
                reliability: 9.0,
                catalogNumber: "M0320S",
                leadTime: "2-4 days",
                qualityScore: 8.7,
              },
            },
            shelfLife: "24 months",
            storageTemp: "-20°C",
            notes: "Store in single-use aliquots to prevent freeze-thaw damage",
          },
          {
            name: "dNTP Mix (10mM each)",
            category: "Nucleotides",
            criticality: 9,
            function: "Building blocks for DNA synthesis",
            suppliers: {
              ThermoFisher: {
                price: 45.99,
                bulkPrice: 39.09,
                minBulk: 10,
                quality: "High",
                reliability: 9.2,
              },
              NEB: {
                price: 42.5,
                bulkPrice: 36.13,
                minBulk: 8,
                quality: "Premium",
                reliability: 9.4,
              },
              "Sigma-Aldrich": {
                price: 48.75,
                bulkPrice: 42.86,
                minBulk: 6,
                quality: "High",
                reliability: 8.8,
              },
            },
            shelfLife: "12 months",
            storageTemp: "-20°C",
          },
          {
            name: "PCR Buffer (10X)",
            category: "Buffer",
            criticality: 8,
            suppliers: {
              ThermoFisher: {
                price: 25.99,
                bulkPrice: 22.09,
                minBulk: 12,
                quality: "High",
                reliability: 9.2,
              },
              NEB: {
                price: 23.5,
                bulkPrice: 19.98,
                minBulk: 10,
                quality: "High",
                reliability: 9.4,
              },
            },
            shelfLife: "36 months",
            storageTemp: "4°C",
          },
          {
            name: "PCR Tubes (0.2ml)",
            category: "Consumables",
            criticality: 6,
            suppliers: {
              VWR: {
                price: 15.99,
                bulkPrice: 12.79,
                minBulk: 20,
                quality: "Standard",
                reliability: 8.5,
              },
              ThermoFisher: {
                price: 18.5,
                bulkPrice: 16.65,
                minBulk: 15,
                quality: "High",
                reliability: 9.2,
              },
            },
          },
        ],
        equipment: ["Thermal Cycler", "Micropipettes", "Centrifuge"],
        protocolSteps: [
          "Prepare master mix on ice: Taq polymerase, buffer, dNTPs, primers",
          "Add template DNA (10-100 ng for genomic DNA)",
          "Initial denaturation: 94°C for 3 minutes",
          "Cycling (30-35 cycles): 94°C (30s) → 55°C (30s) → 72°C (1 min/kb)",
          "Final extension: 72°C for 7 minutes",
          "Hold at 4°C or store at -20°C",
        ],
        qualityMetrics: {
          reproducibility: 9.2,
          sensitivity: 8.5,
          specificity: 8.8,
          robustness: 9.0,
        },
        riskFactors: [
          {
            factor: "Template quality",
            impact: "High",
            mitigation: "Use high-quality, purified DNA",
          },
          {
            factor: "Primer design",
            impact: "High",
            mitigation: "Use primer design software, check for dimers",
          },
          {
            factor: "Contamination",
            impact: "Medium",
            mitigation: "Use separate areas for setup and analysis",
          },
        ],
      },
      {
        id: "high-fidelity-pcr",
        name: "High-Fidelity PCR Protocol",
        difficulty: "Moderate",
        duration: "3-4 hours",
        successRate: 98,
        costCategory: "Premium",
        description:
          "High-fidelity PCR with proofreading polymerase - essential for cloning and sequencing",
        priority: needsHighFidelity ? "high" : "medium",
        advantages: [
          "50x higher fidelity than Taq",
          "Suitable for cloning",
          "Long amplicons possible (up to 20 kb)",
          "Proofreading activity",
        ],
        disadvantages: [
          "Higher cost ($4.85/reaction)",
          "More sensitive to inhibitors",
          "Requires optimization",
        ],
        totalEstimatedCost: 485.75,
        costPerReaction: 4.85,
        reagents: [
          {
            name: "Phusion High-Fidelity Polymerase",
            category: "Enzyme",
            criticality: 10,
            function:
              "High-fidelity DNA synthesis with 3'-5' exonuclease activity",
            suppliers: {
              ThermoFisher: {
                price: 145.99,
                bulkPrice: 131.39,
                minBulk: 3,
                quality: "Premium",
                reliability: 9.2,
                catalogNumber: "F530S",
                leadTime: "2-3 days",
                qualityScore: 9.8,
              },
              NEB: {
                price: 142.5,
                bulkPrice: 128.25,
                minBulk: 4,
                quality: "Premium",
                reliability: 9.4,
                catalogNumber: "M0530S",
                leadTime: "1-2 days",
                qualityScore: 9.9,
              },
            },
            shelfLife: "24 months",
            storageTemp: "-20°C",
            notes:
              "Extremely sensitive to freeze-thaw cycles - aliquot immediately",
          },
          {
            name: "High-Fidelity dNTP Mix",
            category: "Nucleotides",
            suppliers: {
              ThermoFisher: {
                price: 65.99,
                bulkPrice: 59.39,
                minBulk: 6,
                quality: "Premium",
                reliability: 9.2,
              },
              NEB: {
                price: 62.5,
                bulkPrice: 56.25,
                minBulk: 5,
                quality: "Premium",
                reliability: 9.4,
              },
            },
          },
        ],
        protocolSteps: [
          "Prepare master mix on ice with high-fidelity polymerase",
          "Add template DNA and primers",
          "Initial denaturation: 98°C for 30 seconds",
          "Cycling (30-35 cycles): 98°C (10s) → 55°C (20s) → 72°C (30s/kb)",
          "Final extension: 72°C for 5 minutes",
        ],
        qualityMetrics: {
          reproducibility: 9.8,
          sensitivity: 9.2,
          specificity: 9.5,
          robustness: 8.5,
        },
      },
      {
        id: "fast-pcr",
        name: "Fast PCR Protocol",
        difficulty: "Moderate",
        duration: "1.5-2 hours",
        successRate: 92,
        costCategory: "Premium",
        description:
          "Rapid PCR for time-sensitive applications - results in under 2 hours",
        priority: "low",
        advantages: [
          "Very fast (1.5-2 hours)",
          "Good for screening",
          "High-throughput compatible",
        ],
        disadvantages: [
          "Higher cost ($3.65/reaction)",
          "May sacrifice specificity",
          "Requires fast thermal cycler",
        ],
        totalEstimatedCost: 365.25,
        costPerReaction: 3.65,
        reagents: [
          {
            name: "Fast Taq Polymerase",
            category: "Enzyme",
            suppliers: {
              ThermoFisher: {
                price: 115.99,
                bulkPrice: 104.39,
                minBulk: 4,
                quality: "High",
                reliability: 9.2,
              },
              "Bio-Rad": {
                price: 118.5,
                bulkPrice: 106.65,
                minBulk: 3,
                quality: "High",
                reliability: 9.0,
              },
            },
          },
        ],
        protocolSteps: [
          "Use fast polymerase and optimized buffer",
          "Rapid cycling: 95°C (5s) → 60°C (10s) → 72°C (15s/kb)",
        ],
        qualityMetrics: {
          reproducibility: 8.8,
          sensitivity: 8.2,
          specificity: 8.5,
          robustness: 8.0,
        },
      },
    ];
  };

  const generateCellCultureProtocols = () => {
    return [
      {
        id: "standard-culture",
        name: "Standard Mammalian Cell Culture",
        difficulty: "Moderate",
        duration: "Ongoing (daily maintenance)",
        successRate: 88,
        description: "Basic mammalian cell culture with DMEM and FBS",
        totalEstimatedCost: 285.99,
        reagents: [
          {
            name: "DMEM Media (500ml)",
            category: "Media",
            suppliers: {
              ThermoFisher: {
                price: 35.5,
                bulkPrice: 28.4,
                minBulk: 12,
                quality: "High",
                reliability: 9.2,
              },
              "Sigma-Aldrich": {
                price: 38.99,
                bulkPrice: 31.19,
                minBulk: 10,
                quality: "High",
                reliability: 8.8,
              },
            },
          },
          {
            name: "Fetal Bovine Serum (100ml)",
            category: "Serum",
            suppliers: {
              ThermoFisher: {
                price: 189.99,
                bulkPrice: 161.49,
                minBulk: 5,
                quality: "Premium",
                reliability: 9.2,
              },
              "Sigma-Aldrich": {
                price: 195.5,
                bulkPrice: 166.18,
                minBulk: 4,
                quality: "Premium",
                reliability: 8.8,
              },
            },
          },
        ],
        qualityMetrics: {
          reproducibility: 8.5,
          viability: 9.0,
          contamination_risk: 7.8,
        },
      },
    ];
  };

  const generateProteinProtocols = () => {
    return [
      {
        id: "western-blot",
        name: "Western Blot Protocol",
        difficulty: "Advanced",
        duration: "2 days",
        successRate: 85,
        description: "Standard western blot for protein detection",
        totalEstimatedCost: 425.75,
        reagents: [
          {
            name: "Protein Ladder",
            category: "Standards",
            suppliers: {
              "Bio-Rad": {
                price: 67.89,
                bulkPrice: 55.67,
                minBulk: 6,
                quality: "High",
                reliability: 9.0,
              },
              ThermoFisher: {
                price: 71.25,
                bulkPrice: 60.56,
                minBulk: 5,
                quality: "High",
                reliability: 9.2,
              },
            },
          },
        ],
        qualityMetrics: {
          reproducibility: 8.2,
          sensitivity: 8.8,
          specificity: 9.1,
        },
      },
    ];
  };

  const generateDefaultProtocols = () => {
    return [
      {
        id: "general-molecular",
        name: "General Molecular Biology Protocol",
        difficulty: "Moderate",
        duration: "Variable",
        successRate: 90,
        description: "General molecular biology workflow",
        totalEstimatedCost: 195.5,
        reagents: [],
        qualityMetrics: {
          reproducibility: 8.5,
          sensitivity: 8.0,
          specificity: 8.5,
        },
      },
    ];
  };

  const analyzeExperiment = async () => {
    if (!experiment.trim()) return;

    setLoading(true);
    setProtocols([]);
    setSelectedProtocol(null);
    setCart([]); // Clear cart when analyzing new experiment

    try {
      // Simulate AI analysis
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ protocol_name: experiment }),
      });

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        setItems(data.items);
      } else {
        setItems([]);
        console.warn('No items found in response:', data);
      }
      // setProtocols(analysisResult);
      // if (analysisResult.length > 0) {
      //   setSelectedProtocol(analysisResult[0]);
      // }

      // // Generate AI analysis summary
      // setAiAnalysis({
      //   experimentType:
      //     analysisResult.length > 0
      //       ? analysisResult[0].name.split(" ")[0]
      //       : "General",
      //   protocolsFound: analysisResult.length,
      //   recommendedApproach:
      //     analysisResult.length > 0
      //       ? analysisResult[0].name
      //       : "Standard approach",
      //   keyConsiderations: [
      //     "Consider your budget constraints",
      //     "Evaluate required fidelity vs cost",
      //     "Check equipment availability",
      //     "Plan for reagent storage requirements",
      //   ],
      // });

      // // Generate supplier analysis
      // setSupplierAnalysis(generateSupplierAnalysis(analysisResult));
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSupplierAnalysis = (protocols) => {
    const supplierStats = {};
    const totalReagents = protocols.reduce(
      (acc, protocol) => acc + (protocol.reagents?.length || 0),
      0
    );

    protocols.forEach((protocol) => {
      protocol.reagents?.forEach((reagent) => {
        Object.keys(reagent.suppliers || {}).forEach((supplier) => {
          if (!supplierStats[supplier]) {
            supplierStats[supplier] = { count: 0, avgTrust: 0, totalCost: 0 };
          }
          supplierStats[supplier].count++;
          supplierStats[supplier].avgTrust +=
            reagent.suppliers[supplier].reliability || 8.0;
          supplierStats[supplier].totalCost +=
            reagent.suppliers[supplier].price || 0;
        });
      });
    });

    // Calculate averages
    Object.keys(supplierStats).forEach((supplier) => {
      supplierStats[supplier].avgTrust =
        supplierStats[supplier].avgTrust / supplierStats[supplier].count;
    });

    return {
      totalReagents,
      supplierStats,
      recommendations: [
        "NEB offers highest quality scores but at premium pricing",
        "ThermoFisher provides good balance of quality and availability",
        "Consider bulk purchasing for reagents used across multiple protocols",
        "VWR offers competitive pricing for consumables",
      ],
    };
  };

  const getBestSupplier = (reagent, criteria = "overall") => {
    if (!reagent.suppliers) return null;

    let bestSupplier = null;
    let bestScore = criteria === "price" ? Infinity : 0;

    Object.entries(reagent.suppliers).forEach(([supplier, data]) => {
      let score;
      switch (criteria) {
        case "price":
          score = data.bulkPrice || data.price;
          if (score < bestScore) {
            bestScore = score;
            bestSupplier = { name: supplier, ...data };
          }
          break;
        case "trust":
          score = data.reliability;
          if (score > bestScore) {
            bestScore = score;
            bestSupplier = { name: supplier, ...data };
          }
          break;
        case "quality":
          score = data.qualityScore || data.reliability;
          if (score > bestScore) {
            bestScore = score;
            bestSupplier = { name: supplier, ...data };
          }
          break;
        default:
          // Overall score combining price, trust, and quality
          const priceScore = 10 - (data.price || 100) / 20; // Normalize price
          const trustScore = data.reliability || 8;
          const qualityScore = data.qualityScore || data.reliability || 8;
          score = priceScore * 0.3 + trustScore * 0.4 + qualityScore * 0.3;
          if (score > bestScore) {
            bestScore = score;
            bestSupplier = { name: supplier, ...data, overallScore: score };
          }
      }
    });

    return bestSupplier;
  };

  const addToCart = (reagent, supplier, isBulk = false) => {
    const supplierData = reagent.suppliers[supplier];
    const cartItem = {
      id: Date.now(),
      reagentName: reagent.name,
      supplier: supplier,
      price: isBulk ? supplierData.bulkPrice : supplierData.price,
      quantity: isBulk ? supplierData.minBulk : 1,
      isBulk: isBulk,
      catalogNumber: supplierData.catalogNumber,
      leadTime: supplierData.leadTime,
    };
    setCart([...cart, cartItem]);
  };

  const addItemToCart = (item, alternative) => {
    // Parse price
    let priceValue = alternative.price;
    if (typeof priceValue === 'string') {
      priceValue = parseFloat(priceValue.replace(/[$,]/g, ''));
    }
    
    const cartItem = {
      id: `${item.name}-${alternative.supplier}-${Date.now()}`,
      itemName: item.name || item.product || item.reagent,
      description: item.description,
      supplier: alternative.supplier || 'Unknown Supplier',
      price: priceValue || 0,
      quantity: 1,
      shippingTime: alternative.shippingTime,
      url: alternative.url,
    };
    setCart([...cart, cartItem]);
    
    // Show notification
    setCartNotification(item.name || item.product || item.reagent);
    setTimeout(() => setCartNotification(null), 2000);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleProtocolDetails = (protocolId) => {
    setShowProtocolDetails((prev) => ({
      ...prev,
      [protocolId]: !prev[protocolId],
    }));
  };

  const exportAnalysis = () => {
    const exportData = {
      experiment,
      protocols,
      selectedProtocol,
      aiAnalysis,
      supplierAnalysis,
      cart,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "biolab-protocol-analysis.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCriticalityColor = (score) => {
    if (score >= 9) return "bg-red-100 text-red-800";
    if (score >= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/icon.png"
                alt="FisherFlow"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
            FisherFlow
            </h1>
          </div>
          <p className="text-slate-600 text-base ml-[52px]">
            Research protocol analysis and supplier comparison
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-medium text-slate-900 mb-4">
            Experiment Description
          </h2>
          <textarea
            value={experiment}
            onChange={(e) => setExperiment(e.target.value)}
            placeholder="Describe your research protocol and requirements..."
            className="w-full h-32 p-4 border border-slate-300 rounded-md resize-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm text-slate-700 placeholder:text-slate-400"
          />
          <div className="flex justify-between items-center mt-5">
            <button
              onClick={analyzeExperiment}
              disabled={!experiment.trim() || loading}
              className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Search size={16} />
              )}
              {loading ? "Analyzing" : "Analyze Protocol"}
            </button>

            {cart.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ShoppingCart size={16} />
                  <span>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-slate-900">${calculateTotalCost().toFixed(2)}</span>
                </div>
                <button
                  onClick={exportAnalysis}
                  className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Download size={14} />
                  Export
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cart Notification */}
        {cartNotification && (
          <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-top">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">
              {cartNotification} added to cart
            </span>
          </div>
        )}

        {/* Shopping Cart */}
        {cart.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Shopping Cart
              </h3>
              <div className="text-sm text-slate-600">
                Total: <span className="font-semibold text-slate-900">${calculateTotalCost().toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="border border-slate-200 rounded-md p-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 text-sm mb-1">
                            {cartItem.itemName || cartItem.reagentName}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-600">
                            <span>{cartItem.supplier}</span>
                            {cartItem.shippingTime && (
                              <>
                                <span className="text-slate-400">•</span>
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {cartItem.shippingTime}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900 mb-1">
                            ${(cartItem.price * cartItem.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs text-slate-500">
                            ${cartItem.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
                      >
                        <Minus size={12} className="text-slate-600" />
                      </button>
                      <span className="text-sm font-medium text-slate-900 w-8 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
                      >
                        <Plus size={12} className="text-slate-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items Display */}
        {items.length > 0 && (
          <div className="mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Required Reagents & Equipment
              </h3>
              <p className="text-sm text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} with supplier comparisons
              </p>
            </div>
            <div className="space-y-5">
              {items.map((item, idx) => {
                const alternatives = item.alternatives || [];
                // Fallback for old format
                const hasAlternatives = alternatives.length > 0;
                
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
                  >
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 mb-2 text-base">
                        {item.name || item.product || item.reagent || `Item ${idx + 1}`}
                      </h4>
                      
                      {item.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    
                    {hasAlternatives ? (
                      <div>
                        <h5 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-4">
                          Supplier Options
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {(() => {
                            // Calculate prices and find the cheapest
                            const prices = alternatives.map((alt) => {
                              let priceValue = alt.price;
                              if (typeof priceValue === 'string') {
                                priceValue = parseFloat(priceValue.replace(/[$,]/g, ''));
                              }
                              return !isNaN(priceValue) && priceValue > 0 ? priceValue : Infinity;
                            });
                            const minPrice = Math.min(...prices);
                            
                            return alternatives.map((alt, altIdx) => {
                              // Parse price - handle both string and number formats
                              let priceValue = alt.price;
                              if (typeof priceValue === 'string') {
                                // Remove $ and commas, then parse
                                priceValue = parseFloat(priceValue.replace(/[$,]/g, ''));
                              }
                              const isNumber = !isNaN(priceValue) && priceValue > 0;
                              const isCheapest = isNumber && priceValue === minPrice && minPrice !== Infinity;
                              
                              return (
                                <div
                                  key={altIdx}
                                  className={`border rounded-md p-4 transition-all ${
                                    isCheapest
                                      ? 'border-slate-900 bg-slate-50'
                                      : 'border-slate-200 bg-white hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-slate-900 text-sm">
                                          {alt.supplier || 'Unknown Supplier'}
                                        </span>
                                        {isCheapest && (
                                          <span className="text-[10px] font-medium text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded uppercase tracking-wide">
                                            Best
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {isNumber && (
                                      <span className={`text-lg font-semibold ${isCheapest ? 'text-slate-900' : 'text-slate-700'}`}>
                                        ${priceValue.toFixed(2)}
                                      </span>
                                    )}
                                    {!isNumber && alt.price && (
                                      <span className="text-sm font-medium text-slate-600">
                                        {alt.price}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {alt.shippingTime && (
                                    <div className="mb-3 flex items-center gap-1.5">
                                      <Clock size={12} className="text-slate-400" />
                                      <span className="text-xs text-slate-600">{alt.shippingTime}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center gap-2 mt-3">
                                    {alt.url && (
                                      <a
                                        href={alt.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-slate-600 hover:text-slate-900 underline flex-1"
                                      >
                                        View Product
                                      </a>
                                    )}
                                    <button
                                      onClick={() => addItemToCart(item, alt)}
                                      className="text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md transition-colors"
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    ) : (
                      // Fallback for old format (single supplier)
                      <div className="space-y-2">
                        {item.supplier && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Supplier:</span>
                            <span className="ml-2 text-sm text-gray-800">{item.supplier}</span>
                          </div>
                        )}
                        
                        {(item.shippingTime || item.shipping_time) && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Shipping:</span>
                            <span className="ml-2 text-sm text-gray-800">{item.shippingTime || item.shipping_time}</span>
                          </div>
                        )}
                        
                        {item.urls && Array.isArray(item.urls) && item.urls.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs font-medium text-gray-500 block mb-1">Purchase Links:</span>
                            <div className="space-y-1">
                              {item.urls.slice(0, 3).map((url, urlIdx) => (
                                <a
                                  key={urlIdx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800 underline block truncate"
                                >
                                  {url}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {item.price && (
                          <div className="mt-2">
                            <span className="text-sm font-semibold text-green-600">
                              ${item.price}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Analysis Summary */}
        {aiAnalysis && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-5">
              Analysis Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Experiment Details</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-xs text-slate-400 mb-1">Type</dt>
                    <dd className="text-sm text-white">{aiAnalysis.experimentType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400 mb-1">Protocols Found</dt>
                    <dd className="text-sm text-white">{aiAnalysis.protocolsFound}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400 mb-1">Recommended</dt>
                    <dd className="text-sm text-white">{aiAnalysis.recommendedApproach}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Considerations</h4>
                <ul className="space-y-2">
                  {aiAnalysis.keyConsiderations.map((consideration, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start">
                      <span className="text-slate-500 mr-2">•</span>
                      <span>{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Protocol Comparison */}
        {protocols.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText className="mr-2" />
                Protocol Comparison & Selection
              </h3>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => setComparisonView("cost")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    comparisonView === "cost"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Cost Analysis
                </button>
                <button
                  onClick={() => setComparisonView("feasibility")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    comparisonView === "feasibility"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Zap className="inline w-4 h-4 mr-1" />
                  Feasibility
                </button>
                <button
                  onClick={() => setComparisonView("suppliers")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    comparisonView === "suppliers"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Shield className="inline w-4 h-4 mr-1" />
                  Suppliers
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {protocols.map((protocol, idx) => (
                <div
                  key={protocol.id}
                  className="border-2 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-xl font-semibold text-gray-800 mr-3">
                          {protocol.name}
                        </h4>
                        {protocol.priority === "high" && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                            ⭐ AI Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">
                        {protocol.description}
                      </p>

                      <div className="flex items-center space-x-4 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                            protocol.difficulty
                          )}`}
                        >
                          {protocol.difficulty}
                        </span>
                        <span className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {protocol.duration}
                        </span>
                        <span className="text-gray-600">
                          Success: {protocol.successRate}%
                        </span>
                        <span className="text-gray-600">
                          {protocol.costPerReaction
                            ? `$${protocol.costPerReaction}/reaction`
                            : protocol.costCategory}
                        </span>
                      </div>

                      {comparisonView === "cost" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="text-xs font-medium text-slate-700 mb-2 uppercase tracking-wide">
                              Benefits
                            </h5>
                            <ul className="text-sm text-green-700 space-y-1">
                              {protocol.advantages
                                ?.slice(0, 2)
                                .map((adv, i) => (
                                  <li key={i} className="flex items-start">
                                    <CheckCircle className="w-3 h-3 mr-1 mt-1 flex-shrink-0" />
                                    {adv}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-slate-700 mb-2 uppercase tracking-wide">
                              Considerations
                            </h5>
                            <ul className="text-sm text-red-700 space-y-1">
                              {protocol.disadvantages
                                ?.slice(0, 2)
                                .map((dis, i) => (
                                  <li key={i} className="flex items-start">
                                    <XCircle className="w-3 h-3 mr-1 mt-1 flex-shrink-0" />
                                    {dis}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {comparisonView === "feasibility" &&
                        protocol.qualityMetrics && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {Object.entries(protocol.qualityMetrics).map(
                              ([metric, value]) => (
                                <div key={metric} className="text-center">
                                  <div className="text-lg font-bold text-blue-600">
                                    {value}/10
                                  </div>
                                  <div className="text-xs text-gray-600 capitalize">
                                    {metric.replace("_", " ")}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        ${protocol.totalEstimatedCost?.toFixed(2) || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Total Estimated
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedProtocol(protocol)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                        >
                          Select Protocol
                        </button>
                        <button
                          onClick={() => toggleProtocolDetails(protocol.id)}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium transition-colors flex items-center justify-center"
                        >
                          Details
                          {showProtocolDetails[protocol.id] ? (
                            <ChevronUp className="w-4 h-4 ml-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Protocol Information */}
                  {showProtocolDetails[protocol.id] && (
                    <div className="border-t pt-6 mt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Reagents */}
                        <div>
                          <h5 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                            Required Reagents
                          </h5>
                          {protocol.reagents?.map((reagent, rIdx) => (
                            <div
                              key={rIdx}
                              className="mb-4 p-4 border rounded-lg bg-gray-50"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h6 className="font-medium text-gray-800">
                                    {reagent.name}
                                  </h6>
                                  <p className="text-sm text-gray-600">
                                    {reagent.function || reagent.category}
                                  </p>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${getCriticalityColor(
                                    reagent.criticality
                                  )}`}
                                >
                                  Critical: {reagent.criticality}/10
                                </span>
                              </div>

                              {reagent.suppliers && (
                                <div className="space-y-2">
                                  <h6 className="text-sm font-medium text-gray-700">
                                    Best Suppliers:
                                  </h6>
                                  {Object.entries(reagent.suppliers)
                                    .slice(0, 3)
                                    .map(([supplier, data]) => (
                                      <div
                                        key={supplier}
                                        className="flex justify-between items-center text-sm p-2 bg-white rounded border"
                                      >
                                        <div>
                                          <span className="font-medium">
                                            {supplier}
                                          </span>
                                          <div className="flex items-center mt-1">
                                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                            <span className="text-gray-600">
                                              Trust: {data.reliability}/10 |
                                              Quality: {data.quality}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-medium">
                                            ${data.price?.toFixed(2)}
                                          </div>
                                          {data.bulkPrice && (
                                            <div className="text-xs text-green-600">
                                              Bulk: ${data.bulkPrice.toFixed(2)}
                                            </div>
                                          )}
                                          <button
                                            onClick={() =>
                                              addToCart(
                                                reagent,
                                                supplier,
                                                false
                                              )
                                            }
                                            className="mt-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                                          >
                                            Add to Cart
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Protocol Steps */}
                        <div>
                          <h5 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                            Protocol Steps
                          </h5>
                          {protocol.protocolSteps && (
                            <ol className="space-y-3">
                              {protocol.protocolSteps.map((step, sIdx) => (
                                <li key={sIdx} className="flex">
                                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                                    {sIdx + 1}
                                  </span>
                                  <span className="text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ol>
                          )}

                          {protocol.equipment && (
                            <div className="mt-6">
                              <h6 className="text-xs font-medium text-slate-700 mb-2 uppercase tracking-wide">
                                Required Equipment
                              </h6>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {protocol.equipment.map((eq, eIdx) => (
                                  <li key={eIdx} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                    {eq}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplier Analysis */}
        {supplierAnalysis && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2" />
              Supplier Intelligence Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(supplierAnalysis.supplierStats).map(
                ([supplier, stats]) => (
                  <div key={supplier} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-gray-800 mb-2">
                      {supplier}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Products:</span>
                        <span className="font-medium">{stats.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trust Score:</span>
                        <span className="font-medium">
                          {stats.avgTrust.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-medium">
                          ${stats.totalCost.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                Recommendations
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {supplierAnalysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center max-w-sm shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-900 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Analyzing Protocol
              </h3>
              <p className="text-sm text-slate-600">
                Processing requirements and supplier data...
              </p>
            </div>
          </div>
        )}

        {/* Sample Experiment Suggestions */}
        {protocols.length === 0 && !loading && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              Example Protocols
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Select an example to get started
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                onClick={() =>
                  setExperiment(
                    "I need to perform high-fidelity PCR amplification of DNA samples for downstream cloning into expression vectors. Quality and accuracy are more important than speed."
                  )
                }
                className="text-left p-4 border border-slate-200 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <div className="font-medium text-slate-900 mb-1.5 text-sm">
                  High-Fidelity PCR for Cloning
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Compare standard vs high-fidelity PCR protocols with cost and quality analysis
                </div>
              </button>

              <button
                onClick={() =>
                  setExperiment(
                    "I need to establish mammalian cell culture for HEK293 cells. I want to compare serum-containing vs serum-free media options considering cost and reliability."
                  )
                }
                className="text-left p-4 border border-slate-200 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <div className="font-medium text-slate-900 mb-1.5 text-sm">
                  Cell Culture Setup
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Analyze different media options with supplier trust scores and batch consistency
                </div>
              </button>

              <button
                onClick={() =>
                  setExperiment(
                    "I need to perform Western blot analysis for protein detection. I want the most reliable protocol with good supplier options for antibodies and reagents."
                  )
                }
                className="text-left p-4 border border-slate-200 rounded-md hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <div className="font-medium text-slate-900 mb-1.5 text-sm">
                  Western Blot Analysis
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Protocol comparison with reagent criticality scoring and supplier reliability
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteBioLabAgent;
