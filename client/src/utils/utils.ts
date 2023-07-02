/**
 * Authors needed to fill in whether their question had been answered. However
 * there were no conventions for this, so this is a manual check for it.
 * @param isAnswerdString string we want to check
 * @return true if it seems like the author got their question answered.
 */
export default (isAnswerdString: string): boolean => {
    switch (isAnswerdString.trim()) {
        case 'ja':
            return true;
        case 'Ja':
            return true;
        case 'y':
            return true;
        case 'Yes':
            return true;
        case 'yes':
            return true;
        default:
            return false;
    }
};
