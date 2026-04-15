import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid submission.' }, { status: 400 });
        }

        if (parsed.data.website) {
            return NextResponse.json({ ok: true });
        }

        console.info('Contact form submission received:', {
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
