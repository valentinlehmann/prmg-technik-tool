import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/lib/supabase/client";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const client = createClient();

            const {data, error} = await client.auth.getUser();

            if (error) {
                throw new Error(error.message);
            }

            if (!data?.user) {
                throw new Error("No user found");
            }

            return data.user;
        }
    })
}
