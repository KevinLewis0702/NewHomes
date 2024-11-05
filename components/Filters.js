"use client"
import React from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import {FaFilter} from 'react-icons/fa'
export default function Filters({isWideScreen}) {
  
  return (
    <div className={!isWideScreen ? 'drawer h-full' : 'card bg-base-100 shadow-md h-full overflow-auto'}>
      {!isWideScreen && 
      <>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <FaFilter/>
          Filters
        </label>
      </>
      } 
      <div className={isWideScreen ? "" : "drawer-side z-20 overflow-auto"}>
        {!isWideScreen && <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>}
        <div className="card-body bg-white h-full overflow-auto">
          <div className='flex items-center justify-between'>
            <h2 className="card-title">Filters</h2>
            <button className="btn btn-link no-underline">Reset</button>
          </div>
          <div tabIndex={"0"} className="collapse collapse-arrow mb-[-20px]">
            <input type="checkbox"/> 
            <div className="collapse-title text-base font-medium">
              Popular Filters
            </div>
            <div className="collapse-content"> 
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Company name</span>
                </div>
                <div className='flex items-center gap-4'>
                  <input type="text" placeholder="ABCDEFG comp..." className="input input-bordered w-full max-w-xs input-md" />
                  <IoArrowForwardCircleOutline size={30}/>
                </div>
              </label>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">Live & Exclude Dormant Companies</span>
                </label>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Turnover (£)</span>
                </div>
                <div className='flex items-center justify-around'>
                  <input type="text" placeholder="Min" className="input w-[43%] input-bordered input-sm" />
                  <div className="w-[10%] text-center">to</div>
                  <input type="text" placeholder="Max" className="input w-[43%] input-bordered input-sm" />
                  <IoArrowForwardCircleOutline size={30} className='ml-4'/>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Turnover Growth(%)</span>
                </div>
                <div className='flex items-center justify-around'>
                  <input type="text" placeholder="Min" className="input w-[43%] input-bordered input-sm" />
                  <div className="w-[10%] text-center">to</div>
                  <input type="text" placeholder="Max" className="input w-[43%] input-bordered input-sm" />
                  <IoArrowForwardCircleOutline size={30} className='ml-4'/>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Employees</span>
                </div>
                <div className='flex items-center justify-around'>
                  <input type="text" placeholder="Min" className="input w-[43%] input-bordered input-sm" />
                  <div className="w-[10%] text-center">to</div>
                  <input type="text" placeholder="Max" className="input w-[43%] input-bordered input-sm" />
                  <IoArrowForwardCircleOutline size={30} className='ml-4'/>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Industry</span>
                </div>
                <div>
                  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs input-sm" />
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Registered Address (Post Code)</span>
                </div>
                <div>
                  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs input-sm" />
                </div>
              </label>
            </div>
          </div>
          <div className="divider m-0"></div>
          <div tabIndex={"0"} className="collapse collapse-arrow mb-[-20px]">
            <input type="checkbox"/> 
            <div className="collapse-title text-base font-medium">
              Company Status
            </div>
            <div className="collapse-content"> 
            <div className='form-control mt-4'>
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">Live</span>
              </label>
            </div>
            <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">Exclude Dormant Companies</span>
                </label>
              </div>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">Dissolved</span>
                </label>
              </div>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">In Liquidation</span>
                </label>
              </div>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">in Administration</span>
                </label>
              </div>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">in Voluntary Agreement</span>
                </label>
              </div>
              <div className='form-control mt-4'>
                <label className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">in Receivership</span>
                </label>
              </div>
            </div>
          </div>
          <div className="divider m-0"></div>
        </div>
      </div>
    
    </div>
  )
}
