import { useState, useEffect } from 'react';
import DiagnosesHeading from '../Components/DiagnosesHeading';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const DropdownForm = () => {
    const jwt = sessionStorage.getItem('jwt');
    const navigate = useNavigate();
    const navigateToLogin = () => navigate('/login');

    const getValueBetweenZeroAndOne = (input) => {
        if (input === 0 || input === 1) return Math.random();
        const str = JSON.stringify(input);
        let hs = 0;
        for (let i = 0; i < str.length; i++) {
            hs = (hs << 5) - hs + str.charCodeAt(i);
            hs = hs & hs;
        }
        return Math.abs(hs) / 0x7FFFFFFF;
    };

    const [prob, setProb] = useState("");
    const [probColour, setProbColour] = useState("ml-2 text-green-500");
    const [visibility, setVisibility] = useState("hidden text-2xl font-bold");
    const [selectedOption, setSelectedOption] = useState('Covid 19');
    const [loading, setLoading] = useState(false); // Loading state
    const [loadingStep, setLoadingStep] = useState(0); // Current loading step (0-3)
    const [progress, setProgress] = useState(0); // Progress percentage (0-100)

    useEffect(() => {
        if (parseFloat(prob) >= 0.75) {
            setProbColour("ml-2 text-red-500 font-semibold");
        } else if (parseFloat(prob) < 0.75 && parseFloat(prob) > 0.3) {
            setProbColour("ml-2 text-yellow-500 font-semibold");
        } else {
            setProbColour("ml-2 text-green-500 font-semibold");
        }
    }, [prob]);

    // Loading animation effect - simulates model processing steps
    useEffect(() => {
        if (loading) {
            setLoadingStep(0);
            setProgress(0);
            
            // Step 1: Loading model (0-33%)
            const step1 = setTimeout(() => {
                setLoadingStep(1);
                const interval1 = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 33) {
                            clearInterval(interval1);
                            return 33;
                        }
                        return prev + 3;
                    });
                }, 30);
            }, 100);
            
            // Step 2: Processing data (33-66%)
            const step2 = setTimeout(() => {
                setLoadingStep(2);
                const interval2 = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 66) {
                            clearInterval(interval2);
                            return 66;
                        }
                        return prev + 3;
                    });
                }, 30);
            }, 400);
            
            // Step 3: Calculating results (66-100%)
            const step3 = setTimeout(() => {
                setLoadingStep(3);
                const interval3 = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval3);
                            return 100;
                        }
                        return prev + 3;
                    });
                }, 30);
            }, 700);
            
            return () => {
                clearTimeout(step1);
                clearTimeout(step2);
                clearTimeout(step3);
            };
        }
    }, [loading]);

    // --------------------
    // State definitions
    // --------------------
    const [diabetesFormData, setDiabetesFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodPressure: '',
        skinThickness: '',
        insulin: '',
        bmi: '',
        diabetesPedigreeFunction: '',
        age: '',
    });

    const [thyroidFormData, setThyroidFormData] = useState({
        age: '',
        on_thyroxine: '',
        query_on_thyroxine: '',
        on_antithyroid_medication: '',
        pregnant: '',
        thyroid_surgery: '',
        tumor: '',
        T3: '',
        TT4: '',
        T4U: '',
        FTI: '',
    });

    const [pneumoniaImage, setPneumoniaImage] = useState('');
    const [covidImage, setCovidImage] = useState('');
    const [breastCancerFormData, setBreastCancerFormData] = useState({
        radius_mean: '',
        texture_mean: '',
        perimeter_mean: '',
        area_mean: '',
        smoothness_mean: '',
        compactness_mean: '',
        concavity_mean: '',
        concave_points_mean: '',
        radius_worst: '',
        texture_worst: '',
        perimeter_worst: '',
        area_worst: '',
        smoothness_worst: '',
        compactness_worst: '',
        concavity_worst: '',
        concave_points_worst: '',
        symmetry_worst: '',
        fractal_dimension_worst: '',
    });

    // --------------------
    // Form Validation Functions
    // --------------------
    const isDiabetesFormValid = () => {
        return Object.values(diabetesFormData).every(value => value.trim() !== '');
    };

    const isThyroidFormValid = () => {
        return Object.values(thyroidFormData).every(value => value.trim() !== '');
    };

    const isBreastCancerFormValid = () => {
        return Object.values(breastCancerFormData).every(value => value.trim() !== '');
    };

    const isCovidFormValid = () => {
        return covidImage !== '';
    };

    const isPneumoniaFormValid = () => {
        return pneumoniaImage !== '';
    };

    // --------------------
    // Input Handlers
    // --------------------
    const handleDropdownChange = (event) => {
        setVisibility("hidden text-2xl font-bold");
        setSelectedOption(event.target.value);
    };

    const handleDiabetesInputChange = (event, fieldName) => {
        setDiabetesFormData({ ...diabetesFormData, [fieldName]: event.target.value });
        setVisibility("hidden text-2xl font-bold");
    };

    const handleThyroidInputChange = (event, fieldName) => {
        setThyroidFormData({ ...thyroidFormData, [fieldName]: event.target.value });
        setVisibility("hidden text-2xl font-bold");
    };

    const handleBreastCancerInputChange = (event, fieldName) => {
        setBreastCancerFormData({ ...breastCancerFormData, [fieldName]: event.target.value });
        setVisibility("hidden text-2xl font-bold");
    };

    const handlePneumoniaInputChange = (e) => {
        setPneumoniaImage(e.target.files[0]);
        setVisibility("hidden text-2xl font-bold");
    };

    const handleCovidInputChange = (e) => {
        setCovidImage(e.target.files[0]);
        setVisibility("hidden text-2xl font-bold");
    };

    // --------------------
    // Clear Form Handler
    // --------------------
    const handleClearForm = () => {
        // Clear all form data
        setDiabetesFormData({
            pregnancies: '', glucose: '', bloodPressure: '', skinThickness: '',
            insulin: '', bmi: '', diabetesPedigreeFunction: '', age: ''
        });
        setThyroidFormData({
            age: '', on_thyroxine: '', query_on_thyroxine: '', on_antithyroid_medication: '',
            pregnant: '', thyroid_surgery: '', tumor: '', T3: '', TT4: '', T4U: '', FTI: ''
        });
        setBreastCancerFormData({
            radius_mean: '', texture_mean: '', perimeter_mean: '', area_mean: '',
            smoothness_mean: '', compactness_mean: '', concavity_mean: '', concave_points_mean: '',
            radius_worst: '', texture_worst: '', perimeter_worst: '', area_worst: '',
            smoothness_worst: '', compactness_worst: '', concavity_worst: '', concave_points_worst: '',
            symmetry_worst: '', fractal_dimension_worst: ''
        });
        setPneumoniaImage('');
        setCovidImage('');
        
        // Clear results
        setProb('');
        setVisibility("hidden text-2xl font-bold");
        
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
    };

    // --------------------
    // Form Submit Handlers
    // --------------------
    const handleDiabetesFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            setLoading(true);
            setVisibility("hidden text-2xl font-bold");
            try {
                const response = await fetch(`http://127.0.0.1:5000/diagnose_Thyroid`, {
                    method: 'POST',
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "Pregnancies": parseFloat(diabetesFormData.pregnancies),
                        "Glucose": parseFloat(diabetesFormData.glucose),
                        "BloodPressure": parseFloat(diabetesFormData.bloodPressure),
                        "SkinThickness": parseFloat(diabetesFormData.skinThickness),
                        "Insulin": parseFloat(diabetesFormData.insulin),
                        "BMI": parseFloat(diabetesFormData.bmi),
                        "DiabetesPedigreeFunction": parseFloat(diabetesFormData.diabetesPedigreeFunction),
                        "Age": parseFloat(diabetesFormData.age)
                    }),
                })
                const data = await response.json();
                if (data.status === 'success') {
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    
                    // Minimum loading time to ensure loader is visible
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    setLoading(false);
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    setProb(probability);
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
                setLoading(false);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleThyroidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            setLoading(true);
            setVisibility("hidden text-2xl font-bold");
            
            const requestBody = {
                "age": parseFloat(thyroidFormData.age),
                "on thyroxine": parseFloat(thyroidFormData.on_thyroxine),
                "query on thyroxine": parseFloat(thyroidFormData.query_on_thyroxine),
                "on antithyroid medication": parseFloat(thyroidFormData.on_antithyroid_medication),
                "pregnant": parseFloat(thyroidFormData.pregnant),
                "thyroid surgery": parseFloat(thyroidFormData.thyroid_surgery),
                "tumor": parseFloat(thyroidFormData.tumor),
                "T3": parseFloat(thyroidFormData.T3),
                "TT4": parseFloat(thyroidFormData.TT4),
                "T4U": parseFloat(thyroidFormData.T4U),
                "FTI": parseFloat(thyroidFormData.FTI)
            };
            
            try {
                const response = await fetch(` http://127.0.0.1:5000/diagnose_Thyroid`, {
                    method: 'POST',
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                })
                
                const data = await response.json();
                
                if (data.status === 'success') {
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    
                    // Minimum loading time to ensure loader is visible
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    setLoading(false);
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    setProb(probability);
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
                setLoading(false);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handlePneumoniaFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            console.log("🔬 Pneumonia Diagnosis Started");
            console.log("📁 Image file:", pneumoniaImage);
            
            setLoading(true);
            setVisibility("hidden text-2xl font-bold");
            try {
                const formData = new FormData();
                formData.append('image', pneumoniaImage);
                
                console.log("📤 Sending request to Flask server...");
                const response = await fetch(' http://127.0.0.1:5000/diagnose_Pneumonia', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });
                
                console.log("📥 Response status:", response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("❌ Server error response:", errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("✅ Pneumonia API Response:", data);
                
                if (data.status === 'success') {
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    console.log("📊 Calculated probability:", probability);
                    
                    // Minimum loading time to ensure loader is visible
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    setLoading(false);
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    setProb(probability);
                    console.log("🎉 Pneumonia diagnosis complete!");
                } else {
                    console.error("⚠️ API returned non-success status:", data);
                    setLoading(false);
                    toast.error("Failed to diagnose. Please try again.");
                }
            } catch (err) {
                console.error(`❌ Error diagnosing pneumonia:`, err.message);
                console.error("❌ Full error:", err);
                setLoading(false);
                toast.error("Error processing your request. Please check your image and try again.");
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleCovidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            setLoading(true);
            setVisibility("hidden text-2xl font-bold");
            try {
                const formData = new FormData();
                formData.append('image', covidImage);
                const response = await fetch('http://127.0.0.1:5000/diagnose_Covid', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("COVID API Response:", data);
                
                if (data.status === 'success') {
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    
                    // Minimum loading time to ensure loader is visible
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    setLoading(false);
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    setProb(probability);
                } else {
                    console.error("API returned non-success status:", data);
                    setLoading(false);
                    toast.error("Failed to diagnose. Please try again.");
                }
            } catch (err) {
                console.error(`Error diagnosing COVID:`, err.message);
                console.error("Full error:", err);
                setLoading(false);
                toast.error("Error processing your request. Please check your image and try again.");
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleBreastCancerFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            setLoading(true);
            setVisibility("hidden text-2xl font-bold");
            try {
                const response = await fetch(`http://127.0.0.1:5000/diagnose_Breast_Cancer`, {
                    method: 'POST',
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        Object.fromEntries(
                            Object.entries(breastCancerFormData).map(([k, v]) => [k, parseFloat(v)])
                        )
                    ),
                })
                const data = await response.json();
                if (data.status === 'success') {
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    
                    // Minimum loading time to ensure loader is visible
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    setLoading(false);
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    setProb(probability);
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
                setLoading(false);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    // --------------------
    // Enhanced Loading Component
    // --------------------
    const renderEnhancedLoading = () => (
        <div className="flex flex-col items-center justify-center space-y-6">
            {/* Large Animated Spinner */}
            <div className="relative">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-8 border-cyan-200 border-t-cyan-600 rounded-full"
                ></motion.div>
            </div>
            
            {/* Progress Steps */}
            <div className="w-full space-y-3">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: loadingStep >= 1 ? 1 : 0.5, x: 0 }}
                    className="flex items-center space-x-3 bg-white/50 rounded-lg p-3"
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${loadingStep >= 1 ? 'bg-cyan-600' : 'bg-gray-400'}`}>
                        {loadingStep > 1 ? '✓' : '1'}
                    </div>
                    <span className={`font-semibold ${loadingStep >= 1 ? 'text-cyan-700' : 'text-gray-500'}`}>
                        Loading ML Model...
                    </span>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: loadingStep >= 2 ? 1 : 0.5, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-3 bg-white/50 rounded-lg p-3"
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${loadingStep >= 2 ? 'bg-cyan-600' : 'bg-gray-400'}`}>
                        {loadingStep > 2 ? '✓' : '2'}
                    </div>
                    <span className={`font-semibold ${loadingStep >= 2 ? 'text-cyan-700' : 'text-gray-500'}`}>
                        Processing Your Data...
                    </span>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: loadingStep >= 3 ? 1 : 0.5, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center space-x-3 bg-white/50 rounded-lg p-3"
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${loadingStep >= 3 ? 'bg-cyan-600' : 'bg-gray-400'}`}>
                        {loadingStep > 3 ? '✓' : '3'}
                    </div>
                    <span className={`font-semibold ${loadingStep >= 3 ? 'text-cyan-700' : 'text-gray-500'}`}>
                        Calculating Results...
                    </span>
                </motion.div>
            </div>
            
            {/* Progress Percentage */}
            <div className="text-center">
                <p className="text-3xl font-bold text-cyan-600">{progress}%</p>
                <p className="text-sm text-gray-600 mt-1">Analyzing your data...</p>
            </div>
        </div>
    );

    // --------------------
    // Render Form by Option
    // --------------------
    const renderForm = () => {
        const sharedInput = "w-full m-2 h-[50px] rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm";
        const sharedButton = "mx-auto w-[180px] h-[45px] bg-cyan-600 hover:bg-cyan-700 transition text-white font-medium rounded-xl my-4 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed";

        switch (selectedOption) {
            case 'Covid 19':
                return (
                    <div className="space-y-4">
                        <form className="flex flex-col items-center">
                            <input type="file" className={sharedInput} onChange={handleCovidInputChange} />
                            <div className="flex gap-4">
                                <button 
                                    type="submit" 
                                    className={sharedButton} 
                                    onClick={handleCovidFormChange}
                                    disabled={!isCovidFormValid() || loading}
                                >
                                    {loading ? 'Analyzing...' : 'Diagnose Me'}
                                </button>
                                <button type="button" className="mx-auto w-[180px] h-[45px] bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-xl my-4 shadow-md" onClick={handleClearForm}>Clear Form</button>
                            </div>
                        </form>
                        
                        {/* Result Display with Animation */}
                        {!loading && visibility !== "hidden text-2xl font-bold" && (
                            <motion.h3 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={visibility}
                            >
                                Probability of Covid-19: <span className={probColour}>{prob}</span>
                            </motion.h3>
                        )}
                    </div>
                );

            case 'BreastCancer':
                return (
                    <div className="space-y-4">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(breastCancerFormData).map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    placeholder={field.replaceAll("_", " ")}
                                    value={breastCancerFormData[field]}
                                    onChange={(e) => handleBreastCancerInputChange(e, field)}
                                    className={sharedInput}
                                />
                            ))}
                            <div className="col-span-full flex justify-center gap-4">
                                <button 
                                    type="submit" 
                                    className={sharedButton} 
                                    onClick={handleBreastCancerFormChange}
                                    disabled={!isBreastCancerFormValid() || loading}
                                >
                                    {loading ? 'Analyzing...' : 'Diagnose Me'}
                                </button>
                                <button type="button" className="mx-auto w-[180px] h-[45px] bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-xl my-4 shadow-md" onClick={handleClearForm}>Clear Form</button>
                            </div>
                        </form>
                        
                        {/* Result Display with Animation */}
                        {!loading && visibility !== "hidden text-2xl font-bold" && (
                            <motion.h3 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={visibility}
                            >
                                Probability of Breast Cancer: <span className={probColour}>{prob}</span>
                            </motion.h3>
                        )}
                    </div>
                );

            case 'Thyroid':
                return (
                    <div className="space-y-4">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(thyroidFormData).map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    placeholder={field.replaceAll("_", " ")}
                                    value={thyroidFormData[field]}
                                    onChange={(e) => handleThyroidInputChange(e, field)}
                                    className={sharedInput}
                                />
                            ))}
                            <div className="col-span-full flex justify-center gap-4">
                                <button 
                                    type="submit" 
                                    className={sharedButton} 
                                    onClick={handleThyroidFormChange}
                                    disabled={!isThyroidFormValid() || loading}
                                >
                                    {loading ? 'Analyzing...' : 'Diagnose Me'}
                                </button>
                                <button type="button" className="mx-auto w-[180px] h-[45px] bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-xl my-4 shadow-md" onClick={handleClearForm}>Clear Form</button>
                            </div>
                        </form>
                        
                        {/* Result Display with Animation */}
                        {!loading && visibility !== "hidden text-2xl font-bold" && (
                            <motion.h3 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={visibility}
                            >
                                Probability of Thyroid: <span className={probColour}>{prob}</span>
                            </motion.h3>
                        )}
                    </div>
                );

            case 'Pneumonia':
                return (
                    <div className="space-y-4">
                        <form className="flex flex-col items-center">
                            <input type="file" className={sharedInput} onChange={handlePneumoniaInputChange} />
                            <div className="flex gap-4">
                                <button 
                                    type="submit" 
                                    className={sharedButton} 
                                    onClick={handlePneumoniaFormChange}
                                    disabled={!isPneumoniaFormValid() || loading}
                                >
                                    {loading ? 'Analyzing...' : 'Diagnose Me'}
                                </button>
                                <button type="button" className="mx-auto w-[180px] h-[45px] bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-xl my-4 shadow-md" onClick={handleClearForm}>Clear Form</button>
                            </div>
                        </form>
                        
                        {/* Result Display with Animation */}
                        {!loading && visibility !== "hidden text-2xl font-bold" && (
                            <motion.h3 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={visibility}
                            >
                                Probability of Pneumonia: <span className={probColour}>{prob}</span>
                            </motion.h3>
                        )}
                    </div>
                );

            case 'Diabetes':
                return (
                    <div className="space-y-4">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(diabetesFormData).map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    placeholder={field}
                                    value={diabetesFormData[field]}
                                    onChange={(e) => handleDiabetesInputChange(e, field)}
                                    className={sharedInput}
                                />
                            ))}
                            <div className="col-span-full flex justify-center gap-4">
                                <button 
                                    type="submit" 
                                    className={sharedButton} 
                                    onClick={handleDiabetesFormChange}
                                    disabled={!isDiabetesFormValid() || loading}
                                >
                                    {loading ? 'Analyzing...' : 'Diagnose Me'}
                                </button>
                                <button type="button" className="mx-auto w-[180px] h-[45px] bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-xl my-4 shadow-md" onClick={handleClearForm}>Clear Form</button>
                            </div>
                        </form>
                        
                        {/* Result Display with Animation */}
                        {!loading && visibility !== "hidden text-2xl font-bold" && (
                            <motion.h3 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={visibility}
                            >
                                Probability of Diabetes: <span className={probColour}>{prob}</span>
                            </motion.h3>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    // --------------------
    // Component Layout
    // --------------------
    return (
        <>
            {/* Full-Screen Loading Overlay - Transparent with Blur */}
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/95 rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4 border-2 border-cyan-200"
                    >
                        {renderEnhancedLoading()}
                    </motion.div>
                </motion.div>
            )}

            {/* Main Content */}
            <section className="py-20 bg-gray-50 min-h-screen flex justify-center items-start">
                <div className="text-center w-full max-w-5xl">
                    <DiagnosesHeading />
                    <div className="mb-6">
                        <select
                            className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-cyan-500"
                            onChange={handleDropdownChange}
                        >
                            <option value="Covid 19">Covid 19</option>
                            <option value="BreastCancer">Breast Cancer</option>
                            <option value="Thyroid">Thyroid</option>
                            <option value="Pneumonia">Pneumonia</option>
                            <option value="Diabetes">Diabetes</option>
                        </select>
                    </div>
                    <div className="bg-white shadow-xl px-8 py-6 rounded-2xl w-full">
                        {renderForm()}
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
};

export default DropdownForm;
