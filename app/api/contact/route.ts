import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Basic server-side validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Log the payload as requested
        console.log('Contact Form Submission Recieved:', body);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
