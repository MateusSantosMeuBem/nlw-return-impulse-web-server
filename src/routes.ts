import express from 'express';
import { NodeMailerAdapter } from './repositories/adapters/nodemailer/nodemailer-mailer-adapter';
import { PrismaFeedbackRpository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submite-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body

    const prismaFeedbackRpository = new PrismaFeedbackRpository();
    const nodemailerMailAdpter = new NodeMailerAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbackRpository,
            nodemailerMailAdpter
        );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
})