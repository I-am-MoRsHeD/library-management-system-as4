

const SectionTitle = ({ title, width }: { title: string ; width?: string}) => {
    return (
        <div>
            <h3 className={`border-b-[2px] border-black w-20 text-center rounded-b-xl ${width}`}>{title}</h3>
        </div>
    );
};

export default SectionTitle;