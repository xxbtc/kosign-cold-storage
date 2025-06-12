// HomepageEncryptedPaperBenefits.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function HomepageEncryptedPaperBenefits() {
  return (
    <section className="encrypted-paper-benefits-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="encrypted-benefits-compact">
              <h3 className="encrypted-benefits-compact-title">Distributed paper vaults that outlast hardware failures, company bankruptcies, and generational changes</h3>
              <div className="encrypted-benefits-inline">
                <div className="encrypted-benefit-compact">
                  <span className="encrypted-benefit-icon-small">🔒</span>
                  <div>
                    <strong>Safe to Duplicate</strong>
                    <span>Make unlimited encrypted copies</span>
                  </div>
                </div>
                <div className="encrypted-benefit-compact">
                  <span className="encrypted-benefit-icon-small">🏢</span>
                  <div>
                    <strong>Store Anywhere</strong>
                    <span>Banks, safes, trusted people</span>
                  </div>
                </div>
                <div className="encrypted-benefit-compact">
                  <span className="encrypted-benefit-icon-small">🛡️</span>
                  <div>
                    <strong>Disaster Proof</strong>
                    <span>No single point of failure</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}