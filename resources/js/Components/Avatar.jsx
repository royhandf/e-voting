export default function Avatar({ name }) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true`;

    return <img src={avatarUrl} alt={name} className="w-7 h-7" />;
}
