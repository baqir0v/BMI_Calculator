import React, { useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #ff7f50, #ff6347);
  font-family: "Arial", sans-serif;
  color: #fff;
`;

const CalculatorContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #ff6347;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 14px;
  color: #444;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff6347;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #ff6347;
  color: white;
  font-size: 16px;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #ff4500;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

const BMIValue = styled.h2`
  color: ${(props) => props.color || "#4caf50"};
`;

const Status = styled.p`
  font-size: 18px;
  color: #ff6347;
`;

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [bmiColor, setBmiColor] = useState("#4caf50"); // Default color for normal BMI
  const [error, setError] = useState("");

  const calculateBMI = () => {
    if (isNaN(height) || isNaN(weight) || height === "" || weight === "") {
      setError("Xahiş edirik, bütün məlumatları düzgün daxil edin!");
      return;
    }

    let heightInMeters = height;
    if (heightUnit === "cm") {
      heightInMeters = height / 100;
    }

    const bmiValue = weight / heightInMeters ** 2;
    setBmi(bmiValue.toFixed(2));

    let bmiStatus = "";
    let bmiColor = "#4caf50"; // Default green for normal BMI

    if (bmiValue < 18.5) {
      bmiStatus = "Aşağı çəki";
      bmiColor = "#ffeb3b"; // Yellow for underweight
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      bmiStatus = "Normal";
      bmiColor = "#4caf50"; // Green for normal BMI
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      bmiStatus = "Artıq çəki";
      bmiColor = "#ffeb3b"; // Yellow for overweight
    } else {
      bmiStatus = "Obezite";
      bmiColor = "#f44336"; // Red for obese
    }

    setStatus(bmiStatus);
    setBmiColor(bmiColor); // Set the color dynamically
    setError("");
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;

    if (heightUnit === "cm") {
      if (!/^\d+$/.test(value)) {
        return;
      }
    }

    if (heightUnit === "m") {
      if (!/^\d*\.?\d{0,2}$/.test(value)) {
        return;
      }
    }

    setHeight(value);
  };

  return (
    <AppContainer>
      <CalculatorContainer>
        <Title>BMI Hesablama Kalkulyatoru</Title>
        <div>
          <Label>
            Boy:{" "}
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </Label>
          <div>
            <Input
              type="number"
              value={height}
              onChange={handleHeightChange}
              placeholder="Boyu daxil edin"
              min={heightUnit === "cm" ? "50" : "0.5"}
              max={heightUnit === "cm" ? "250" : "2.5"}
            />
          </div>
        </div>

        <div>
          <Label>Çəki (kg):</Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Çəkini daxil edin"
            min="10"
            max="500"
          />
        </div>

        <Button onClick={calculateBMI}>Hesabla</Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {bmi && (
          <ResultContainer>
            <BMIValue color={bmiColor}>BMI: {bmi}</BMIValue>
            <Status>{status}</Status>
          </ResultContainer>
        )}
      </CalculatorContainer>
    </AppContainer>
  );
}

export default App;
