import { MailAdapter } from "../repositories/adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCasezRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdpter: MailAdapter
    ){}
    
    async execute(request: SubmitFeedbackUseCasezRequest){
       const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is required.')
        }
        if(!comment){
            throw new Error('Comment is required.')
        }

       if(screenshot && !screenshot.startsWith('data:image/png;base64')){
           throw new Error('Invalid screenshot format.')
       }

       await this.feedbacksRepository.create({
           type,
           comment,
           screenshot,
       })

       await this.mailAdpter.sendMail({
           subject: 'Novo Feedback',
           body: [
                `<div style="font-family: sans-serif; fitn-size: 16px; color: #111">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`
            ].join('\n')
       })
        
    }
}