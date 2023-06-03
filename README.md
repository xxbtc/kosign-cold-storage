# Kosign: Cold Storage with Social Recovery


#### Overview
Create paper-based cold storage digital vaults to securely 
store digital assets, 2FA recovery codes, master passwords, and other critical data.
Distribute upto 20 paper keys. Set the minimum # of keys required to unlock (e.g 4-out-of-10) 
 
* Print your encrypted vault on paper 
* Distribute upto 20 paper keys 
* Set the minimum threshold of keys required to unlock (e.g 4-out-of-10) 
* Use to store:
  * Digital asset seeds
  * Private keys
  * Master passwords
  * 2FA recovery codes
  * Password manager recovery code
  * Github 2FA recovery codes
  * Other critical data
* Vaults can be used for digital asset succession / usage as a digital will: 
Give your successors a copy of your paper vault. 
Since the vault is encrypted, they will be able to 
store it fairly securely over long periods of time. 
In an emergency, they will be able to call on your key guardians 
to provide their keys and recover the vault contents. 

 
Try an online version of Kosign at [kosign.xyz](https://kosign.xyz)


#### Threat model
* Consider having several copies of your vault spread across geographically distant locations (e.g fire/earthquake risk)
* Reduce risk of having your vault cloned, by storing copies in physically secure locations such as safety deposit boxes. Keep copies covered, and away from cameras 
* While key guardians only hold a key shard and cannot access vault contents without a copy of the encrypted vault, 
they can potentially turn evil, collude and extort you. For example, by refusing to provide their key without payment 
or a portion of whats in the vault. To combat this, have a vault that has sufficiently distributed keys, 
and set a low enough quroum threshold so that your vault is recoverable even with an evil majority. 
* Consider risks of keeping a list of your key guardians, and how an attacker may use the list. 
By default, key guardians do not have knowledge of each other.
* Consider distributing keys across a variety of your social circles. Consider risks of concentrating keys with one group (e.g family feuds, fights with friends, etc) 
* Distribute keys securely. Print them out from your offline computer to a physically connected printer 
and wipe the printer's memory when you are done. 


## How it works

1. Install Kosign on your offline computer
2. Create a vault to store secret data. A strong encryption key is generated in your browser and is used to lock your vault
3. Distribute upto 20 different key shares, and set the minimum number of keys required to unlock. For example 5-out-of-20
4. Print your vaults and keys on paper
5. Call on your key guardians to unlock and recover contents

## Install Kosign

Kosign is built using javascript and is easy to install 

```git clone https://github.com/xxbtc/kosign-coldstorage.git```

```yarn install```

```yarn start```

Then open [http://localhost:3000](http://localhost:3000) to view in your browser.



