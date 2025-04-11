interface SacProps {
    className?: string;
}

const Sac: React.FC<SacProps> = ({ className }) => (
    <svg className={className} width="20" height="46" viewBox="0 0 33 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 10.5H6V31M13.5 10.5V18H19.5V10.75M13.5 10.5V3.5M6 36V44.5H27V36M6 36V34M6 36C1.42786 36.0598 1.63649 36.7482 1 32.5V21.5V10.5C1.29715 6.36701 0.293707 3.54415 4 3.5H13.5M6 34H27V36M6 34V31M13.5 3.5V1H19.5V3.5M19.5 3.5H28C30.6489 4.37641 31.2663 6.56462 31 9V31C31 34 30.5 36 28 36C25.5 36 27 36 27 36M19.5 3.5V10.75M19.5 10.75C22.4289 10.75 24.0711 10.75 27 10.75V31M27 36V31M6 31H16.5H27" stroke="#CDA97E" strokeWidth="2"/>
    </svg>
);

export default Sac;
