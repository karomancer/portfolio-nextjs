import styles from "./styles.module.scss"

type Image = {
    alt: string;
    url: string;
}

interface Props {
    images: Image[];
}

const Gallery = ({images}: Props) => (
    <ul className={styles["gallery"]}>
        {images.map(image => (
            <img src={image.url} alt={image.alt} />
        ))}
    </ul>
)   

export default Gallery