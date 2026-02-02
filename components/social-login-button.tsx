"use client"

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";

// Copied from supabase-js types
export type Provider =
    | 'apple'
    | 'azure'
    | 'bitbucket'
    | 'discord'
    | 'facebook'
    | 'figma'
    | 'github'
    | 'gitlab'
    | 'google'
    | 'kakao'
    | 'keycloak'
    | 'linkedin'
    | 'linkedin_oidc'
    | 'notion'
    | 'slack'
    | 'slack_oidc'
    | 'spotify'
    | 'twitch'
    /** Uses OAuth 1.0a */
    | 'twitter'
    /** Uses OAuth 2.0 */
    | 'x'
    | 'workos'
    | 'zoom'
    | 'fly'

export default function SocialLoginButton(props: {provider: Provider, providerName: string}) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSocialLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: props.provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
                },
            })

            if (error) throw error
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {error && <p className="text-sm text-destructive-500">{error}</p>}
            <Button className="w-full" disabled={isLoading} onClick={handleSocialLogin}>
                {isLoading ? 'Bitte warten...' : `Mit ${props.providerName} anmelden`}
            </Button>
        </div>
    )
}