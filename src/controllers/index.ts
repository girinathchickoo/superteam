import { json } from "stream/consumers";
import config from "../config";





const controllers = {
    fetchToken() {
        return fetch(`${config.solstation}/tokens`).then(res => res.json())
    }, fetchBalance(address) {
        return fetch(`${config.blockend}/balances?walletAddress=${address}`).then(res => res.json())
    },
    async getCampaign() {
        return await fetch(`${config.solstation}/getCampaign?campaignId=donation-1`)
    },
    async createDonation(data: {}) {
        return await fetch(`${config.solstation}/createDonation`, { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }
}


export default controllers;