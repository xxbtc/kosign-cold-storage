import React from 'react'
import { SiOpenai, SiClaude, SiGooglegemini, SiPerplexity } from 'react-icons/si';
import "../style/aiSummarySection.css";

export default function AISummarySection() {
    const prompt = encodeURIComponent("Please provide a summary of Kosign (https://kosign.xyz). It's an open source tool for cryptographic secret sharing and paper-based cold storage of passwords, crypto keys, and digital assets. Explain what it does, its main features, and who would benefit from using it.");
    
    return (
        <div className="aiSummarySection">
            <p className="aiSummaryTitle">Request an AI summary of Kosign</p>
            <div className="aiSummaryLinks">
                <a href={`https://chat.openai.com/?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="aiSummaryLink" aria-label="ChatGPT">
                    <SiOpenai />
                </a>
                <a href={`https://claude.ai/new?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="aiSummaryLink" aria-label="Claude">
                    <SiClaude />
                </a>
                <a href={`https://gemini.google.com/?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="aiSummaryLink" aria-label="Gemini">
                    <SiGooglegemini />
                </a>
                <a href={`https://www.perplexity.ai/search?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="aiSummaryLink" aria-label="Perplexity">
                    <SiPerplexity />
                </a>
            </div>
        </div>
    )
}
