<?php

class FormHelper
{
    public static function isTooShort($value, $minLength)
    {
        $value = trim($value);

        return (empty($value)) or (strlen($value) < $minLength);
    }
}