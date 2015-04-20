<?php namespace Controllers;

use View, Response;
use Repositories\ImageHandler\ImageHandlerInterface as ImageHandlerInterface;
use Repositories\ConfigReader\ConfigReaderInterface as ConfigReaderInterface;

class ImageController extends BaseController
{
    public function __construct(ImageHandlerInterface $imageHandler, 
        ConfigReaderInterface $reader)
    {
        parent::__construct($imageHandler, $reader);
        $this->imageHandler = $imageHandler;
        $this->reader = $reader;
    }

    /***************************************
     *  Show the images of a specific date
     */ 

    public function index($selectedDay = "")
    {
        // ---------------------------------
        // If no day selected take last day

        if($selectedDay == "")
        {
            $selectedDay = $this->imageHandler->getDays(1)[0];
        }

        // --------------------------------------------------------------
        // Get the last hour of the selected day when an event occurred.

        $lastHourOfDay = $this->imageHandler->getLastHourOfDay($selectedDay);

        // ----------------------------------------------------------------------
        // Get last x days from the imagehandler -> move to BaseController

        $days = $this->imageHandler->getDays(5);

        return View::make('image', [
            'days' => $days,
            'selectedDay' => $selectedDay,
            'lastHourOfDay' => $lastHourOfDay
        ]);
    }

    /*************************************
     *  Get all days
     */ 
    public function getDays()
    {
        $days = $this->imageHandler->getDays(-1);

        return Response::json($days);
    }

    /*************************************
     *  Get the latest image that was taken.
     */ 

    public function getLatestImage()
    {
        return $this->imageHandler->getLatestImage();
    }

    /********************************
     *  Get the latest sequence.
     */ 

    public function getLatestSequence()
    {
        $images = $this->imageHandler->getLatestSequence();

        return Response::json($images);
    }

    /******************************************
     *  Return output images as json.
     *      - page: one indexed.
     *      - images are returned in reversed order, most recent images first.
     */ 
    
    public function getImages($day, $take = 16, $page = 1)
    {
        $maxTimeBetweenTwoImagesInSeconds = 120;
        
        $images = $this->imageHandler->getImagesSequenceFromDay($day, $page, $maxTimeBetweenTwoImagesInSeconds);

        return Response::json($images);
    }

    /************************************
     *  Return output images as json.
     *      - page: one indexed.
     *      - images are shown in ascending order, from a specific start time
     */
    public function getImagesFromStartTime($day, $take = 16, $page = 1, $time = 0)
    {
        $maxTimeBetweenTwoImagesInSeconds = 120;
        
        $images = $this->imageHandler->getImagesSequenceFromDayAndStartTime($day, $page, 
                                                                            $time, $maxTimeBetweenTwoImagesInSeconds);
        return Response::json($images);
    }

    /****************************************************
     *  Return images per hour for the last x days
     */
    public function getImagesPerHour($days = 3, $averageDays = 9)
    {
        $imagesPerHour = $this->imageHandler->getNumberOfImagesPerHourForLastDays($days, $averageDays);

        return Response::json($imagesPerHour);
    }

    /****************************************************
     *  Return images per hour for a specific day
     */
    public function getImagesPerHourForDay($day)
    {
        $imagesPerHour = $this->imageHandler->countImagesPerHour($day);
        
        return Response::json($imagesPerHour);
    }

    /************************************************
     *  Return images per day for the last x days
     */
    public function getImagesPerDay($days = 3, $averageDays = 9)
    {
        $imagesPerDay = $this->imageHandler->getNumberOfImagesPerDayForLastDays($days, $averageDays);

        return Response::json($imagesPerDay);
    }

    /**************************************************
     *  Return images per week day for the last x days
     */
    public function getAverageImagesPerWeekDay($numberOfWeeks = 1)
    {
        $imagesPerWeekDay = $this->imageHandler->getNumberOfImagesPerWeekDayPerInstance($numberOfWeeks);

        return Response::json($imagesPerWeekDay);
    }
}   