import React from 'react';

const VaultMetadata = ({ metadata, VAULT_VERSIONS }) => {

    if (!metadata) return null;
    
    return (
        <div className="vault-metadata">
            <div className="metadata-header">
                <div className="meta-item">
                    <span className="meta-label">Vault Name</span>
                    <span className="meta-value">{metadata.name}</span>
                </div>
            </div>
            <div className="metadata-details">
                <div className="meta-item">
                    <span className="meta-label">Required Keys</span>
                    <span className="meta-value">{metadata.threshold} of {metadata.shares}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Total Keys</span>
                    <span className="meta-value">{metadata && metadata.keys && metadata.keys.length}</span>
                </div>
                
                <div className="meta-item">
                    <span className="meta-label">Cipher IV</span>
                    <span className="meta-value">
                        {metadata.cipherIV
                            ? `${metadata.cipherIV.slice(0, 3)}...${metadata.cipherIV.slice(-3)}`
                            : ''}
                    </span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Total Shards</span>
                    <span className="meta-value">{metadata.qrcodes-1}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Version</span>
                    <span className="meta-value">{metadata.version || '1'}</span>
                </div>
                {VAULT_VERSIONS[metadata.version || '1'] && (
                    <>
                        <div className="meta-item">
                            <span className="meta-label">Encryption</span>
                            <span className="meta-value">{VAULT_VERSIONS[metadata.version || '1'].algorithm}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Key Derivation</span>
                            <span className="meta-value">{VAULT_VERSIONS[metadata.version || '1'].kdf}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VaultMetadata; 