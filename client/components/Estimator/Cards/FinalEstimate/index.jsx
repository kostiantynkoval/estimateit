import React, { Component } from 'react';
import { Button, Card, CardBlock } from 'reactstrap';
  import domtoimage from 'dom-to-image';
import styles from './styles.scss';

export default class FinalEstimate extends Component {
  constructor(props) {
    super(props);
    this.saveAsPdf = this.saveAsPdf.bind(this);
  }
  filter(node) {
    return (node.tagName !== 'BUTTON'
    && node.id !== 'screenShot' && node.className !== 'radarChartPart');
  }
  saveAsPdf() {
    const root = document.getElementById('screen');
    domtoimage.toPng(root, { filter: this.filter })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        const doc = new jsPDF('p', 'mm', [(root.clientHeight * 25.4) / 90, 300]);

        doc.addImage(img, 'PNG', 2, 2);
        doc.save('a4.pdf');
      });
  }

  render() {
    return (
      <Card className={styles.finalEstimate}>
        <CardBlock className={styles.finalEstimate__wrapper}>
          <div className={styles.finalEstimate__result}>
            <div className={styles.finalEstimate__result_info}>Total hours: {this.props.hours}</div>
          </div>
          <div className={styles.finalEstimate__result}>
            <div className={styles.finalEstimate__result_info}>Total sum: {this.props.hours * this.props.rate}$</div>
          </div>
          <div className={styles.finalEstimate__result}>
            <Button color="danger" onClick={this.saveAsPdf}>Generate PDF</Button>
          </div>
        </CardBlock>
      </Card>
    );
  }
}
