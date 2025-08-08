import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

export async function POST(request: Request) {
    const { email, password } = await request.json();
    const emailString = email.toLowerCase().trim();
    const passwordString = password.trim();

    if (!emailString) {
        return NextResponse.json(
            { type: 'EMAIL', error: 'Email is required' },
            { status: 400 }
        );
    }

    if (!passwordString) {
        return NextResponse.json(
            { type: 'PASSWORD', error: 'Password is required' },
            { status: 400 }
        );
    }

    const supabase = createClient<Database>(
        process.env.PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    );

    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailString,
        password: passwordString,
    });

    if (error) {
        return NextResponse.json(
            { type: 'GENERAL', error: 'Invalid login credentials' }, 
            { status: 401 }
        );
    }

    if (!data.session || !data.user) {
        return NextResponse.json(
            { type: 'GENERAL', error: 'Sign in failed (no session data)' }, 
            { status: 500 }
        );
    }

    return NextResponse.json(
        { type: 'SUCCESS', session: data.session },
        { status: 200 }
    )
}