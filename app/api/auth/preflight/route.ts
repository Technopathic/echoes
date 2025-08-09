import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '../../db';
import { refreshSession } from '../../db';

export async function POST(request: NextRequest) {
     const { refreshToken  } = await request.json();

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json(
            { type: 'AUTH', error: 'Missing authorization token' },
            { status: 401 }
        )
    }

    const auth = await getAuth(authHeader);
    if (!auth) {
        if (refreshToken) {
            const session = await refreshSession(refreshToken)
            if (!session) {
                return NextResponse.json(
                    { type: 'AUTH', error: 'Unable to refresh session' },
                    { status: 500 }
                )
            }

            return NextResponse.json(
                { type: 'SUCCESS', session },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { type: 'AUTH', error: 'Missing refresh token' },
            { status: 401 }
        )
    }

    return NextResponse.json(
        { type: 'SUCCESS', session: null },
        { status: 200 }
    )
}