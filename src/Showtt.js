import React from 'react';
import courses from './BasketData';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM','1:00 PM-2:00 PM', '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM'];

const ShowTimetable = () => {
  const params = useParams();
  const selectedElectives = JSON.parse(decodeURIComponent(params.selectedElectives || '[]'));
  const downloadPDF = () => {
    const content = document.getElementById('pdfContent');
    // Create the options for the PDF
    const options = {
      margin: 10, // You can adjust margins if needed
      filename: 'react_page.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    // Generate the PDF
    html2pdf().from(content).set(options).save();
  }
  return (
    <>
    <div id='pdfContent'>
      <h2>Timetable</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>day/Time</th>
            {timeSlots.map((slot) => (
              <th key={slot}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {timeSlots.map((slot, index) => {
                let courseAbbr = '', type = '', room = '';
                selectedElectives.forEach((course) => {
                  if (course.type.L && course.type.L.day === day && +course.type.L.slot === index + 1) {
                    courseAbbr = course.abbr + ' (L) ' + course.type.L.room;
                  } else if (course.type.T && course.type.T.day === day && +course.type.T.slot === index + 1) {
                    courseAbbr = course.abbr + ' (T) ' + course.type.T.room;
                  } else if (course.type.P && course.type.P.day === day && +course.type.P.slot === index + 1) {
                    courseAbbr = course.abbr + ' (P) ' + course.type.P.room;
                  } else if (course.type.PM && course.type.PM.day === day && +course.type.PM.slot === index + 1) {
                    courseAbbr = course.abbr;
                  }
                });
                return (
                  <>
                    <td key={slot}>{courseAbbr}</td>
                  </>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button onClick={downloadPDF}>Download PDF</button>
    </>
  );
};

export default ShowTimetable;
