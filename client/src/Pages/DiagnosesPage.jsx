import { useState, useEffect } from 'react';
import DiagnosesHeading from '../Components/DiagnosesHeading';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        if (parseFloat(prob) >= 0.75) {
            setProbColour("ml-2 text-red-500 font-semibold");
        } else if (parseFloat(prob) < 0.75 && parseFloat(prob) > 0.3) {
            setProbColour("ml-2 text-yellow-500 font-semibold");
        } else {
            setProbColour("ml-2 text-green-500 font-semibold");
        }
    }, [prob]);

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
    // Form Submit Handlers
    // --------------------
    const handleDiabetesFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(` http://127.0.0.1:5000/diagnose_Diabetes`, {
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
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    setProb(probability);
                    setDiabetesFormData({
                        pregnancies: '', glucose: '', bloodPressure: '', skinThickness: '',
                        insulin: '', bmi: '', diabetesPedigreeFunction: '', age: ''
                    });
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleThyroidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(` http://127.0.0.1:5000/diagnose_Thyroid`, {
                    method: 'POST',
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
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
                    }),
                })
                const data = await response.json();
                if (data.status === 'success') {
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    setProb(probability);
                    setThyroidFormData({
                        age: '', on_thyroxine: '', query_on_thyroxine: '', on_antithyroid_medication: '',
                        pregnant: '', thyroid_surgery: '', tumor: '', T3: '', TT4: '', T4U: '', FTI: '',
                    });
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handlePneumoniaFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('image', pneumoniaImage);
                const response = await fetch(' http://127.0.0.1:5000/diagnose_Pneumonia', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    setProb(probability);
                    setPneumoniaImage('');
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleCovidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('image', covidImage);
                const response = await fetch(' http://127.0.0.1:5000/diagnose_Covid', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    setProb(probability);
                    setCovidImage('');
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    const handleBreastCancerFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(` http://127.0.0.1:5000/diagnose_Breast_Cancer`, {
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
                    setVisibility("flex text-2xl font-bold justify-center mt-4");
                    const probability = getValueBetweenZeroAndOne(data.probability);
                    setProb(probability);
                    setBreastCancerFormData(Object.fromEntries(Object.keys(breastCancerFormData).map(k => [k, ''])));
                }
            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")
        }
    };

    // --------------------
    // Render Form by Option
    // --------------------
    const renderForm = () => {
        const sharedInput = "w-full m-2 h-[50px] rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm";
        const sharedButton = "mx-auto w-[180px] h-[45px] bg-cyan-600 hover:bg-cyan-700 transition text-white font-medium rounded-xl my-4 shadow-md";

        switch (selectedOption) {
            case 'Covid 19':
                return (
                    <div className="space-y-4">
                        <form className="flex flex-col items-center">
                            <input type="file" className={sharedInput} onChange={handleCovidInputChange} />
                            <button type="submit" className={sharedButton} onClick={handleCovidFormChange}>Diagnose Me</button>
                        </form>
                        <h3 className={visibility}>Probability of Covid-19: <span className={probColour}>{prob}</span></h3>
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
                            <div className="col-span-full flex justify-center">
                                <button type="submit" className={sharedButton} onClick={handleBreastCancerFormChange}>Diagnose Me</button>
                            </div>
                        </form>
                        <h3 className={visibility}>Probability of Breast Cancer: <span className={probColour}>{prob}</span></h3>
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
                            <div className="col-span-full flex justify-center">
                                <button type="submit" className={sharedButton} onClick={handleThyroidFormChange}>Diagnose Me</button>
                            </div>
                        </form>
                        <h3 className={visibility}>Probability of Thyroid: <span className={probColour}>{prob}</span></h3>
                    </div>
                );

            case 'Pneumonia':
                return (
                    <div className="space-y-4">
                        <form className="flex flex-col items-center">
                            <input type="file" className={sharedInput} onChange={handlePneumoniaInputChange} />
                            <button type="submit" className={sharedButton} onClick={handlePneumoniaFormChange}>Diagnose Me</button>
                        </form>
                        <h3 className={visibility}>Probability of Pneumonia: <span className={probColour}>{prob}</span></h3>
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
                            <div className="col-span-full flex justify-center">
                                <button type="submit" className={sharedButton} onClick={handleDiabetesFormChange}>Diagnose Me</button>
                            </div>
                        </form>
                        <h3 className={visibility}>Probability of Diabetes: <span className={probColour}>{prob}</span></h3>
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
    );
};

export default DropdownForm;
