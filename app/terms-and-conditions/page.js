import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <>
    <Header />
    <main className="max-w-6xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Terms of Service

Definitions:

Person: Refers to an individual or corporate body and encompasses personal representatives, successors, and permitted assignees.

Company Track: Encompasses the website companytrack.com, all associated applications, software, third-party site pages/accounts, and published content.

Services: Online offerings on Company Track related to details about companies, businesses, and certain individuals.

Terms: The collective name for these Terms of Use, Privacy Policy, Acceptable Use Policy, Cookies Policy, Fair Usage Policy, and any subsequent terms or policies introduced.

We/us/our: Refers to Company Track Ltd, a registered company in England and Wales (09461023), located at Aldwych House, 71-91 Aldwych, London WC2B 4HN. Trading under “Company Track”.

You/your: Pertains to users, their affiliated entities, or any third parties acting on their behalf. This extends to subsidiary or holding companies as defined in the Companies Act 2006.


Agreement:

This document outlines the terms for using CompanyTrack.com and its associated services.

The terms apply between the user ("Customer") and CompanyTrack Limited, registered in England and Wales (08348964).

Using the services indicates agreement to these terms. If you disagree, please refrain from using the services.

We reserve the right to amend these terms without notice. Regular review of these terms is recommended.


Use of the Services:

Registering for some Companytrack services requires accurate personal information.

Utilize our information and services in compliance with the GDPR and relevant laws.

Transferring data from Companytrack must also adhere to GDPR guidelines and associated laws.

Access our information only through approved methods.

Automated access methods (e.g., scripts, scrapers) are prohibited, barring search engine use.

Ensure your activity doesn't disrupt our service infrastructure.


Payments and Refunds:

Payments are facilitated by PayPal and Stripe.

While most payments process swiftly, occasional delays can occur, which we strive to minimize.

Refund requests are subject to our discretion, with justifications provided upon denial.

Money Back Guarantee:

Applicable once per customer on pay-as-you-go products only.

Provides a refund equal to the purchase amount.

Excludes subscriptions and monthly plans.

Must be invoked within 30 days of purchase.

Users seeking refunds must comply with all agreement terms.

Termination: 

We can halt service access if:

Payments are overdue.

Any agreement terms are breached.

Warranty and Liability:

Companytrack offerings are "as is", without guarantees regarding accuracy.

We're not liable for any damages or losses resulting from using our services.`}
        </pre>
      </div>
    </main>
       <Footer />
       </>
  );
};

export default TOS;
