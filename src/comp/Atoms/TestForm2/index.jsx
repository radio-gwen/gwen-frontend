import { useState } from "react";
import BtnCTA from "../BtnCTA";

const TestForm2 = () => {
    const [transmissionValues, setTransmissionValues] = useState({
        title: "",
        desc: "",
        text: "",
    });

    const [image, setImage] = useState(null);

    const [trackValues, setTrackValues] = useState({
        name: "",
        desc: "",
        date: "",
        file: null,
        mainId: "",  // Main ID (from transmission)
        type: "trans",  // Default type
    });

    // Handle changes for transmission form
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("track-")) {
            const trackField = name.replace("track-", ""); // Remove "track-" prefix
            setTrackValues((prevValues) => ({
                ...prevValues,
                [trackField]: value,
            }));
        } else {
            setTransmissionValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    // Handle file change for track file upload
    const handleTrackFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setTrackValues((prevValues) => ({
            ...prevValues,
            file: selectedFile,
        }));
    };

    // Handle image change for transmission
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    // Submit both forms
    async function handleSubmit(e) {
        e.preventDefault();

        // Submit transmission data
        const formData = new FormData();
        formData.append("title", transmissionValues.title);
        formData.append("desc", transmissionValues.desc);
        formData.append("text", transmissionValues.text);

        if (image) {
            formData.append("image", image);
        }

        try {
            // Transmission Submission
            const transmissionResponse = await fetch(
                "https://localhost:8000/api/transmissions",
                {
                    method: "POST",
                    body: formData, // No need to set Content-Type manually
                }
            );

            if (!transmissionResponse.ok) {
                const result = await transmissionResponse.json();
                alert(
                    "Failed to add transmission: " + (result.error || "Unknown error")
                );
                return;
            }

            const transmissionResult = await transmissionResponse.json();
            console.log("Transmission added successfully:", transmissionResult);

            // After successful transmission submission, set mainId for the track
            setTrackValues((prevValues) => ({
                ...prevValues,
                mainId: transmissionResult.id,  // Assuming the ID of the transmission is returned
            }));

            // Submit track data with the file
            const formTrackData = new FormData();
            formTrackData.append("name", trackValues.name);
            formTrackData.append("desc", trackValues.desc);
            formTrackData.append("date", trackValues.date);
            formTrackData.append("mainId", trackValues.mainId);  // Add mainId to track
            formTrackData.append("type", trackValues.type);  // Default type 'trans'

            // Append the track file if it exists
            if (trackValues.file) {
                formTrackData.append("file", trackValues.file);
            }

            // Track submission
            const trackResponse = await fetch("https://localhost:8000/api/tracks", {
                method: "POST",
                body: formTrackData,
            });

            const trackResult = await trackResponse.json();
            console.log("Track Response JSON:", trackResult); // Log the parsed JSON response

            if (!trackResponse.ok) {
                alert(
                    "Failed to add track: " + (trackResult.error || "Unknown error")
                );
                return;
            }

            console.log("Track added successfully:", trackResult);
            alert("Transmission and track added successfully!");
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong: " + err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Transmission Inputs */}
            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
            />
            <input
                type="text"
                name="title"
                placeholder="Transmission Title"
                value={transmissionValues.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="desc"
                placeholder="Transmission Description"
                value={transmissionValues.desc}
                onChange={handleChange}
            />
            <textarea
                rows="5"
                name="text"
                placeholder="Text Transmission"
                value={transmissionValues.text}
                onChange={handleChange}
            ></textarea>

            {/* Track Inputs */}
            <h3>Track</h3>
            <input
                type="text"
                name="track-name"
                placeholder="Track Name"
                value={trackValues.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="track-desc"
                placeholder="Track Description"
                value={trackValues.desc}
                onChange={handleChange}
            />
            <input
                type="date"
                name="track-date"
                placeholder="Track Date"
                value={trackValues.date}
                onChange={handleChange}
            />
            <input
                type="file"
                name="track-file"
                accept=".mp3,.wav,.flac"
                onChange={handleTrackFileChange}
            />

            <BtnCTA btnContent="Submit!" />
        </form>
    );
};

export default TestForm2;
