import axios from 'axios';
export class BinanceController {
    async long1h(content: string) {
        await axios
        .post(
            "https://api.telegram.org/bot2122523169:AAGD-I05i3q4jwH3w-KCNapSiZOJssOCSq8/sendMessage", {
                chat_id: '1762522092',
                text: content,
            }
        )
    }
}