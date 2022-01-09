<?php

class JsonContent{

}

class Content extends Loggable
{
    private $_jsonFilePath;

    private $_topic;
    private $_subtopic;
    private $_reference;
    private $_content;

    public function __construct($jsonFilePath, $topic, $subtopic, $reference, $content)
    {
        $this->_jsonFilePath = $jsonFilePath;
        $this->_topic = $topic;
        $this->_subtopic = $subtopic;
        $this->_reference = $reference;
        $this->_content = $content;
    }

    public function add($object){

    }

    public function write()
    {
    }
}