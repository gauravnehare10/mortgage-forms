import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useFormStore from "../../store";

const mortgageNav = [
  { path: "/mortgage/add-data/application-type", label: "Application Type" },
  { path: "/mortgage/add-data/early-repayment", label: "Early Repayment/Moving Home/Product Types" },
  { path: "/mortgage/add-data/prioritise-your-needs", label: "Prioritise Your Needs" },
  { path: "/mortgage/add-data/establish-budget", label: "Establishing a Budget" },
  { path: "/mortgage/add-data/mortgage-details", label: "Mortgage Details" },
  { path: "/mortgage/add-data/repaying-mortgage", label: "Repaying Mortgage" },
  { path: "/mortgage/add-data/solicitor-estate-agent", label: "Solicitor/Estate Agent Details" },
  { path: "/mortgage/add-data/declaration", label: "Declaration" }
]

const NavItem = ({ path, label }) => (
  <li style={{ paddingLeft: "20px" }}>
    <NavLink to={path} className={({ isActive }) => (isActive ? "active-link" : "")}>
      {label}
    </NavLink>
  </li>
);

const Navbar = () => {
  const { formData, fetchFormData } = useFormStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen((prev) => !prev);

  useEffect(()=>{
    fetchFormData("occupationData")
  },[fetchFormData])

  const baseNav = [
    { path: "/mortgage/add-data/personal-details", label: "Main Details" },
    { path: "/mortgage/add-data/residential", label: "Residential Details" },
    { path: "/mortgage/add-data/occupation", label: "Occupation Details" },
    { path: "/mortgage/add-data/employer-benefit", label: "Employer Benefit" },
    { path: "/mortgage/add-data/secondary-occupation", label: "Secondary Occupation Details" },
    { path: "/mortgage/add-data/other-monthly-income", label: "Other Monthly Income" },
    { path: "/mortgage/add-data/other-income-source", label: "Non-Working - Other Income Source" },
    { path: "/mortgage/add-data/total-income", label: "Total Income Details" },
    { path: "/mortgage/add-data/existing-credit-commits", label: "Liabilities - Credit Commitments" },
    { path: "/mortgage/add-data/existing-mortgage", label: "Liabilities - Existing Mortgage" },
    { path: "/mortgage/add-data/monthly-expenditure", label: "Monthly Expenditure Details" },
    { path: "/mortgage/add-data/emergency-fund", label: "Emergency Fund/Health & Will Detail" },
  ];

  const employerBenefitIndex = baseNav.findIndex(
    (item) => item.label === "Employer Benefit"
  );

  const mainDetails = [
    { path: "/mortgage/add-data/main-details", label: "Main Details" },
  ]

  const personalNav = [
    ...baseNav.slice(0, employerBenefitIndex + 1),
    ...(formData.occupationData?.status === "Self-Employed"
      ? [
          { path: "/mortgage/add-data/self-employed-details", label: "Self Employed Details" },
          { path: "/mortgage/add-data/self-employed-income-details", label: "Self Employed Income Details" },
        ]
      : []),
    ...baseNav.slice(employerBenefitIndex + 1),
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="nav-toggle"
        onClick={toggleNavbar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Left Fixed Navbar */}
      <nav className={`mortgage-navbar ${isOpen ? "open" : ""}`}>
        <details open>
          <summary>Main Details</summary>
          <ul className="mort-nav-links">
            {mainDetails.map((item) => (
              <NavItem key={item.path} path={item.path} label={item.label} />
            ))}
          </ul>
        </details>
        <details open>
          <summary>Personal Details</summary>
          <ul className="mort-nav-links">
            {personalNav.map((item) => (
              <NavItem key={item.path} path={item.path} label={item.label} />
            ))}
          </ul>
        </details>
        <details open>
          <summary>Mortage</summary>
          <ul className="mort-nav-links">
            {mortgageNav.map((item) => (
              <NavItem key={item.path} path={item.path} label={item.label} />
            ))}
          </ul>
        </details>
      </nav>
    </>
  );
};

export default Navbar;
