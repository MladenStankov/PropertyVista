"use client";

import React, { useState } from "react";
import CalculatorBeforeSubmit from "../components/calculator/CalculatorBeforeSubmit";
import CalculatorAfterSubmit from "../components/calculator/CalculatorAfterSubmit";

export interface ICalculator {
  monthlyIncome: number | string;
  monthlyDebt: number | string;
  availableFunds: number | string;
  location: string;
}

export interface IResults {
  easy: [number, number];
  stretch: [number, number];
  difficult: [number, number];
}

export default function Calculator() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<ICalculator>({
    monthlyIncome: "",
    monthlyDebt: "",
    availableFunds: "",
    location: "",
  });
  const [results, setResults] = useState<IResults | null>(null);
  const [errors, setErrors] = useState<Partial<ICalculator>>({});

  const validateForm = () => {
    const newErrors: Partial<ICalculator> = {};
    if (!form.monthlyIncome || Number(form.monthlyIncome) <= 0) {
      newErrors.monthlyIncome = "Monthly income must be a positive number.";
    }
    if (!form.monthlyDebt || Number(form.monthlyDebt) < 0) {
      newErrors.monthlyDebt = "Monthly debt cannot be negative.";
    }
    if (!form.availableFunds || Number(form.availableFunds) <= 0) {
      newErrors.availableFunds = "Available funds must be a positive number.";
    }
    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (Number(form.monthlyIncome) < Number(form.monthlyDebt)) {
      newErrors.monthlyIncome =
        "Monthly income cannot be less than monthly debt.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (form: ICalculator) => {
    if (!validateForm()) {
      return;
    }
    try {
      const requestBody = {
        monthlyIncome: Number(form.monthlyIncome),
        monthlyDebt: Number(form.monthlyDebt),
        availableFunds: Number(form.availableFunds),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calculator/affordability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setResults(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error with calculator:", error);
    }
  };

  return (
    <div>
      {!submitted ? (
        <CalculatorBeforeSubmit
          form={form}
          errors={errors}
          handleChange={handleFormChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <CalculatorAfterSubmit results={results} location={form.location} />
      )}
    </div>
  );
}
