const { ddbClient, ses, aws } = require("../libs/awsClient")
const { Telegraf } = require('telegraf')
const nodemailer = require("nodemailer")

const { PutItemCommand } = require("@aws-sdk/client-dynamodb")
const { ptBR } = require("date-fns/locale");
const { format } = require('date-fns');

const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});

module.exports = class sendController {
    static async telegram(req, res) {

        const bot = new Telegraf(process.env.BOT_TOKEN);
        const { id, company, name, email, phone, subject, message } = req.body

        bot.telegram.sendMessage(process.env.BOT_USER, `  
            Menssagem do site ${company}
        
            ID:  ${id}
            
            Nome:  ${name}
        
            E-mail:  ${email}  
        
            Telefone:  ${phone}  
        
            Assunto:  ${subject}  
            
            Mensagem:
            ${message}
        `
        )
            .then((message) => {
                console.log(message)
                res.status(200).json({ message: "Mensagem enviada com sucesso!" });
            })
            .catch((err) => console.log(err))

    }

    static async sendMail(req, res) {

        const { id, image, company, site, name, email, phone, subject, message } = req.body

        transporter.sendMail({
            from: `Contato ${company} ${process.env.SES_FROM}`,
            to: process.env.SES_TO,
            subject: `${process.env.SES_SUBJECT} ${company}`,
            text: "Hello world?",
            html: `<style>*{font-family:arial,sans-serif}a{text-decoration:none;color:#000}th,td{padding:8px}span{font-weight:800;padding-right:5px}h4,p{text-align:center}.logo{padding-bottom:10px;border-bottom:solid 4px #d3ae58}</style>
                    <div class="logo">
                    <img src="https://www.${process.env.SES_IMAGE_URL}.com.br/logo${image}.svg" alt="Logo ${company}" width="100">
                    </div>
                    <div>
                    <h2>Menssagem do site ${company}</h2>
                    <table>
                    <tr>
                    <td><span>ID:</span>${id}</td>
                    </tr>
                    <tr>
                    <td><span>Nome:</span>${name}</td>
                    </tr>
                    <tr>
                    <td><span>E-mail:</span>${email}</td>
                    </tr>
                    <tr>
                    <td><span>Telefone:</span>${phone}</td>
                    </tr>
                    <tr>
                    <td><span>Assunto:</span>${subject}</td>
                    </tr>
                    <tr>
                    <td><span>Mensagem:</span></td>
                    </tr>
                    <tr>
                    <td style="text-align:justify">${message}</td>
                    </tr>
                    </table>
                    </div>
                    <div>
                    <p>Em breve, voltaremos com mais informativos do site.</p>
                    <h4><a href="https://www.${site}.com.br/">${company}</a></h4>
                    </div>
                `,
        })
            .then((message) => {
                console.log(message)
                res.status(200).json({ message: "Mensagem enviada com sucesso!" });
            })
            .catch((err) => console.log(err))
    }

    static async database(req, res) {

        const { id, company, name, email, phone, subject, message } = req.body
        const diaAtual = format(new Date(), 'dd/MM/yyyy', {
            locale: ptBR
        })

        const params = {

            TableName: "CONTACT_AGA_SITE",
            Item: {
                'DATA': { S: diaAtual },
                'ID': { S: id },
                "EMPRESA": { S: company },
                'NOME': { S: name },
                'EMAIL': { S: email },
                'TELEFONE': { S: phone },
                'ASSUNTO': { S: subject },
                'MENSAGEM': { S: message }
            },
        };

        ddbClient.send(new PutItemCommand(params))
            .then((message) => {
                console.log(message)
                res.status(200).json({ message: "Mensagem enviada com sucesso!" });
            })
            .catch((err) => console.log(err))
    }
}