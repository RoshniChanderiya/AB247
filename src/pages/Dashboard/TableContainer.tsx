import classNames from "classnames";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import styles from "./styles.module.scss";

interface TableProps {
  title: string;
  footerLink: string;
  children: React.ReactNode;
}

const TableContainer: React.FC<TableProps> = ({
  title,
  footerLink,
  children,
}) => {
  return (
    <Card className={classNames(styles.tableContainer, "my-2")}>
      <CardHeader className={classNames(styles.tableHeader)}>
        {title}
      </CardHeader>
      <CardBody className={classNames(styles.tableContent)}>
        {children}
      </CardBody>
      <CardFooter className={classNames(styles.tableFooter, "text-center")}>
        <Link to={footerLink}> See All {title}</Link>
      </CardFooter>
    </Card>
  );
};

export default TableContainer;
