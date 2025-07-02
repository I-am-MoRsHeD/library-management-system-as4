

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <h3 className="border-b-[2px] border-black w-20 text-center rounded-b-xl">{title}</h3>
        </div>
    );
};

export default SectionTitle;