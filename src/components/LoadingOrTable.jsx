import React from 'react';
import LottiePlayers from './LottiePlayers';
import CommonTable from './CommonTable';

const LoadingOrTable = ({ columns, rows, viewDetails, maxHeight, loading }) => {

  return (
    <>
      {loading ? (
       <div className='text-center'>
   {/*     // <p className='loading loading-spinner loading-lg'>loading......</p> */}
       <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
       </div>
      ) : rows.length >= 1 ? (
        <CommonTable
          columns={columns}
          rows={rows}
          viewDetails={viewDetails}
          maxHeight={maxHeight}
        />
      ) :
      !loading && !rows.length>=1 ?
      (
      <>  
      {/* <p  className='text-2xl text-center '>No Data Found.</p> */}
 <LottiePlayers src="https://lottie.host/213f7823-b3fe-4df0-9b2b-f10f412b9519/jONQ1jwzN4.json" />
     </>
      )
      : <></>
      }
    </>
  );
};

export default LoadingOrTable;
