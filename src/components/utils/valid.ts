export const checkLink = async (url: string): Promise<boolean> => {
    return (await fetch(url)).ok;
};

export const isValidUrl = (urlString: string): boolean => {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
};

export const validateYouTubeUrl = (urlToParse: string): boolean => {
    if (urlToParse) {
        const regExp =
            /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (urlToParse.match(regExp)) {
            return true;
        }
    }
    return false;
};

export const validateFacebookVideoUrl = (urlToParse: string): boolean => {
    if (urlToParse) {
        const regExp =
            /^https?:\/\/www\.facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/gm;
        if (urlToParse.match(regExp)) {
            return true;
        }
    }
    return false;
};

export const isValidJson = (json: string): boolean => {
    try {
        JSON.parse(json);
        return true;
    } catch (_) {
        return false;
    }
};

// SQL datetime format: yyyy-mm-dd hh:mm:ss
export function isValidDateTime(dateTimeString: string): boolean {
    const dateTimeRegex =
        /(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?/gi;

    if (!dateTimeRegex.test(dateTimeString)) {
        return false;
    }

    const timestamp = Date.parse(dateTimeString);

    return !isNaN(timestamp);
}
