import {Loader2} from "lucide-react";

export default function LoadingOverlay() {
    return (
        <div className={"w-full h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center z-50"}>
            <Loader2 className={"w-16 h-16 text-white animate-spin"} />
        </div>
    )
}